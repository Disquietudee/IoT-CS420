import pandas as pd
import json
from gpt4all import GPT4All

df = pd.read_csv('exampledata.csv')
df = df[df['Sensor Name'].notna()]
df_dict = df.groupby('Sensor Name').apply(lambda x: x.drop('Sensor Name', axis=1).values.tolist()).to_dict()

# model = GPT4All("wizardlm-13b-v1.2.Q4_0.gguf", model_path=".",allow_download=False,n_ctx=6000)

system_template = '''You're a report generator for Air quality. 
Analyse the trend and spot any potential problem areas of the following dataset and write this into a report format. 

There are threshold to indicate that it is green, amber or red.
For CO2, the threshold for green is below 600ppm, 600 to 800 ppm for amber and above 800 ppm for red.
For temperature, the threshold for green is below 25.5 degree celsius, 25.5 to 27 degree celsius for amber and above 27 degree celsius for red.
For Humidity, the threshold for green is below 60 percentage, 60 to 65 percentage for amber and above 65 percentage for red.

The report must follow the follow format : 

1. CO2 emissions Trend Analysis:
2. Temperature Trend Analysis:
3. Humidity Trend Analysis:
4. Conclusion:
'''
prompt_template = 'USER: {0}\nASSISTANT: '

report = {}

for sensor, data in df_dict.items():
    model = GPT4All("mistral-7b-openorca.gguf2.Q4_0.gguf", model_path=".",allow_download=False,n_ctx=6000)
    with model.chat_session(system_template, prompt_template): 
                print(sensor)

                prompts = 'Generate the report for the following sensor data in {}:{} '.format('Living Room',data)
                response = model.generate(prompts, temp=0, max_tokens=1024)
                
                print(response)
                report[sensor] = response

print(report)
