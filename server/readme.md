### Sample ENV
```bash
MONGO_URI=mongodb://localhost:27017/omni-food
JWT_SECRET=secret
EMAIL=
PASSWORD=
SERVER_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
NODE_ENV=Development
PORT=5000
```

## Setting Up Email and Password

### Step 1: Choose an Email Service Provider
- **Gmail** 

### Step 2: Get Your Email and Password
- **For Gmail**:
    1. Create a Gmail account if you don’t have one: [Gmail Sign Up](https://www.gmail.com).
    2. Use an App-Specific Password if you have 2FA enabled.
    3. https://myaccount.google.com/security 
       -> In the search for app password
       -> Choose app password (security)
       -> Generate your password there
    4. Your email will be the address you used to sign up (e.g., `youremail@gmail.com`).
    5. The password is your Gmail account password or the App-Specific Password.

### Step 3: Set the Environment Variables
Add the following values to your `.env` file or set them as environment variables.

```bash
EMAIL=your-email@example.com
PASSWORD=your-app-password
```
