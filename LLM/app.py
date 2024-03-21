from flask import Flask, request, send_file
from flask_cors import CORS
from datetime import datetime
import pandas as pd
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from textwrap import wrap
from PIL import Image
from ollama import Client
from multiprocessing import Pool

app = Flask(__name__)
CORS(app)

print("Loading model")
MODEL = 'mistral'
CLIENT = Client(host='ollama:11434')
CLIENT.pull(MODEL)
print("Load model complete")

def generate_model(df_dict):
    system_template = '''You assigned the task of reviewing the sensor data for the living room. The data is collected from the CO2, temperature and humidity sensors. 

    There are threshold to indicate that it is green, amber or red.
    For CO2, the threshold for green is below 600ppm, 600 to 800 ppm for amber and above 800 ppm for red.
    For temperature, the threshold for green is below 25.5 degree celsius, 25.5 to 27 degree celsius for amber and above 27 degree celsius for red.
    For Humidity, the threshold for green is below 60 percentage, 60 to 65 percentage for amber and above 65 percentage for red.

    You are to analyse the trend and spot any potential problem areas in the data.
    The report must strictly follow the following format: 

    1. CO2 emissions Trend Analysis:
    2. Temperature Trend Analysis:
    3. Humidity Trend Analysis:
    4. Conclusion:
    5. Recommendation:
    
    '''

    report = {}
    sensor, data = df_dict
    prompt = "Generate the report for the following sensor data in {}:{} ".format('Living Room',data)

    time_start = datetime.now()
    print('Generating report for sensor {}'.format(sensor))
    response = CLIENT.generate(MODEL,prompt+ system_template)

    report[sensor] = response["response"]
    time_end = datetime.now()
    print('Time taken for sensor {} is {}'.format(sensor, time_end - time_start))
    
    return report

def create_pdf(report, scaling_factor, logo_path):
    report_path = os.path.join(os.getcwd(), "report.pdf")
    c = canvas.Canvas(report_path, pagesize=letter)
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
    c.setFont("Helvetica", 10)
    c.drawRightString(580, 20, "Page %d" % page_num)
    for sensor, content in report.items():
        # Split content by newline characters and wrap each line
        
        if x_axis - 50 < 200:  # If adding the content would exceed the remaining space
            c.showPage()  # Move to a new page
            c.setFont("Helvetica-Bold", 24)  # Reset font
            c.drawString(y_axis, 700, title)  # Redraw report title
            x_axis = 680  # Reset starting X-axis position for content
            page_num += 1
            c.setFont("Helvetica", 10)
            c.drawRightString(580, 20, "Page %d" % page_num)
            
        x_axis -= 20  # Space for sensor title
        c.setFillColor(colors.grey)
        c.setFont("Helvetica-Bold", 14)
        c.drawString(y_axis, x_axis, sensor)
        x_axis -= 30  # Space for content
        
        # Draw content text
        t = c.beginText(y_axis, x_axis)
        t.setFont("Helvetica", 10)
        t.setFillColor(colors.black)
        
        content_lines = []
        for line in content.split('\n'):
            wrapped_lines = wrap(line, 120, drop_whitespace=True, fix_sentence_endings=True, break_long_words=True)
            content_lines.extend(wrapped_lines)
            content_lines.append('')
        
        for line in content_lines:
            line_height = 12  # Assuming font size 10
            if x_axis - line_height < 120:  # If adding the line would exceed the remaining space
                c.drawText(t)
                c.showPage()  # Move to a new page
                c.setFont("Helvetica-Bold", 24)  # Reset font
                c.drawString(y_axis, 700, title)  # Redraw report title
                x_axis = 680  # Reset starting X-axis position for content
                page_num += 1
                c.setFont("Helvetica", 10)
                c.drawRightString(580, 20, "Page %d" % page_num)
                
                t = c.beginText(y_axis, x_axis)
                
                t.setFont("Helvetica", 10)
                t.setFillColor(colors.black)
            
            t.textLine(line)
            x_axis -= line_height
        
        c.drawText(t)
        # Draw page number

    c.save()
    return report_path

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv'

@app.route('/generate_report', methods=['POST'])
def generate_report():
    print(len(request.files))
    if 'file' not in request.files:
        return 'No file part in the request', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file and allowed_file(file.filename):
        df = pd.read_csv(file)
    
    print("Loading data")
    df = df[df['deviceName'].notna()]
    df_dict = df.groupby('deviceName').apply(lambda x: x.drop('deviceName', axis=1).values.tolist()).to_dict()
    print("Data loaded")
    
    with Pool(processes=2) as p:
    # with Pool() as p:
        results = p.map(generate_model, df_dict.items())
    report = {}
    for result in results:
        report.update(result)
    logo_path = os.path.join(os.getcwd(), "logo.png")
    
    pdf_path = create_pdf(report, 0.2, logo_path)
    print("Report generated")
    return send_file(pdf_path, mimetype='application/pdf')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
