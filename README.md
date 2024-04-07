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

### Change Username:
Change the username on the file .env
By default, it was
```
username: admin
password: admin
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
