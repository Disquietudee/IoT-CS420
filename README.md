### To start the docker:
```
sudo docker-compose up -d
```

### NodeRed:
On the browser enter 
```
https://server-ip:1880
```

### Grafana:
On the browser enter 
```
https://server-ip:3000
```

### Change Username for influxdb and grafana:
Change the username on the file .env
By default, it was
```
username: admin
password: admin
```

### Change Telegram for LLM
```
BOT_TOKEN=your_bot_token
CHAT_ID=your_chat_id
MESSAGE_THREAD_ID=your_message_thread_id
```

### Change Tuya credentials in NodeRed
```
Create Tuya account and link the devices to the account
In the NodeRed navigate to "Trigger Smart Life Devices" Tab > "Inital Values Setup" Node > "On Start" Tab

Change: 
1. client_id
2. user_id
3. device_id
```

### Change API Key for Weather data in NodeRed
```
1. In NodeRed, navigate to "Get Weather Data" Tab
2. Select openweathermap node "Singapore"
3. Add API Key from OpenWeatherMap
```
