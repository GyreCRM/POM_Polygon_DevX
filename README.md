# Running locally

### Running the frontend
```
cd frontend/
npm install
npm run dev
```

### Running the backend
Due to the way polygonID works - the mobile app has to send the request to our server for the qr code. But if our server is deployed locally, i.e. at `localhost:8080`, the mobile app can't send the request. An easy way to set this up is with using [ngrok](https://ngrok.com/) as a forwarding service that maps to a local port.
```
ngrok http 8080
```
Change/create the env file on the server
```
INFURA_API_KEY=
INFURA_API_KEY_SECRET=
WALLET_PUBLIC_ADDRESS=
WALLET_PRIVATE_KEY=
INFURA_IPFS_PROJECT_ID=
INFURA_IPFS_PROJECT_SECRET=
NGROK_URL=The url that ngrok ouputs
```
Now we can install the dependencies and run the backend 
```
npm install
npx ts-node ./Verifier_Server.js 
```

### Change the frontend as well
Change the .env file on the frontend
```
VITE_BACKEND_URL=The url that ngrok outputs
```
