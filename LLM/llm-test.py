import pandas as pd
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from textwrap import wrap
from PIL import Image
from gpt4all import GPT4All

def generate_model(df_dict):
    system_template = '''
    You are given a dataset of CO2 with unit of ppm, temperature with unit of degree celsius and humidity with unit of percentage sensor readings.

    There are threshold to indicate that it is green, amber or red.
    For CO2, the threshold for green is below 600ppm, 600 to 800 ppm for amber and above 800 ppm for red.
    For temperature, the threshold for green is below 25.5 degree celsius, 25.5 to 27 degree celsius for amber and above 27 degree celsius for red.
    For Humidity, the threshold for green is below 60 percentage, 60 to 65 percentage for amber and above 65 percentage for red.

    You are to analyse the trend and spot any potential problem areas in the data.
    The report must strictly follow the following format starting with the title: 

    1. CO2 emissions Trend Analysis:
    2. Temperature Trend Analysis:
    3. Humidity Trend Analysis:
    4. Conclusion:
    5. Recommendation:

    '''
    prompt_template = 'USER: {0}\nASSISTANT: '

    report = {}

    for sensor, data in df_dict.items():
        model = GPT4All("mistral-7b-instruct-v0.2.Q8_0.gguf", model_path=".",allow_download=False,n_ctx=6000)
        
        with model.chat_session(system_template, prompt_template): 
                    print(sensor)

                    prompts = 'Generate the report for the following sensor data in {}:{} '.format('Living Room',data)
                    report[sensor] = model.generate(prompts, temp=0, max_tokens=1024)
                    break
                    
    return report

def create_pdf(report, scaling_factor, logo_path):
    c = canvas.Canvas("report.pdf", pagesize=letter)
    c.setFillColor(colors.grey)
    c.setFont("Helvetica-Bold", 24)
    x_axis = 650  # Adjusted to start from top
    y_axis = 180  # Adjusted to start from left
    page_num = 1
    
    # Draw logo
    img = Image.open(logo_path)
    width, height = img.size
    new_width = width * scaling_factor
    new_height = height * scaling_factor
    title = "Vidal Solutions Sensor Data Report"
    c.drawImage(logo_path, y_axis, x_axis, mask='auto', preserveAspectRatio=True, width=new_width, height=new_height)
    
    x_axis -= 50  # Adjusted to provide space for logo
    y_axis -= 80  # Adjusted to start from left
    c.drawString(y_axis, x_axis, title)
    y_axis = 20 # Adjusted to start from left
    
    for sensor, content in report.items():
        # Split content by newline characters and wrap each line
        content_lines = []
        for line in content.split('\n'):
            content_lines.extend(wrap(line, 125, drop_whitespace=True, fix_sentence_endings=True, break_long_words=True))
            content_lines.append('')
        content_height = len(content_lines) * 10  # Assuming font size 10
        sensor_height = 50
        # Check if content exceeds the remaining space on the page
        if x_axis - (content_height + sensor_height) < 50:  # Adjust this threshold as needed
            c.showPage()  # Move to a new page
            c.setFont("Helvetica-Bold", 24)  # Reset font
            c.drawString(y_axis, 700, title)  # Redraw report title
            x_axis = 680  # Reset starting X-axis position for content
            page_num += 1

        x_axis -= 20  # Space for sensor title
        c.setFillColor(colors.grey)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(y_axis, x_axis, sensor)
        x_axis -= 30  # Space for content

        # Draw content text
        t = c.beginText(y_axis, x_axis)
        t.setFont("Helvetica", 10)
        t.setFillColor(colors.black)

        for line in content_lines:
            t.textLine(line)
        c.drawText(t)
        # Adjust X-axis position for content
        x_axis -= content_height
        # Draw page number
        c.setFont("Helvetica", 10)
        c.drawRightString(580, 20, "Page %d" % page_num)
    c.save()

    
csv_path = os.path.join(os.getcwd(), "exampledata.csv")
df = pd.read_csv(csv_path)
df = df[df['Sensor Name'].notna()]
df_dict = df.groupby('Sensor Name').apply(lambda x: x.drop('Sensor Name', axis=1).values.tolist()).to_dict()
report = generate_model(df_dict)
logo_path = os.path.join(os.getcwd(), "logo.png")
create_pdf(report, 0.2, logo_path)
