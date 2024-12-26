# App Appointment

## Description

This application is a tool for businesses and customers, with it you can make appointments in the different businesses that are registered in it.

## Main Features

- Customer control:** Allows you to control the customers who visit the business.
- Scheduling:** Allows professionals to easily plan and schedule appointments.
- Intuitive and attractive interface:** Designed to be easy to use and visually pleasing, even for non-technical users.

## Usage

1. **Installation of Dependencies:**
   ````bash
   pip install -r requirements.txt

2. **Run:**
Create the .env configuration file to specify the cookies for the different supermarkets.

3. **Backend execution:**
   ```bash
   docker build -t api_appointment .
   docker run -itd -p 80:3001 --name ApiAppointment api_appointment
  
4. **Running the frontend:**
  ```bash
   npx expo prebuild
  ```
  ```bash
   npx expo run:android
   npx expo run:ios
  ```
   
## Tech Stack

**Client:** React, TypeScript, Redux

**Server:** Node, Express

## Contributions
Contributions are welcome! If you encounter any problems or have ideas for improvements, please open an issue or send a pull request.
