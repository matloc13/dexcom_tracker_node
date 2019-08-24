# Dexcom Personal
- dexcom_tracker_node

### Mission
make thinking about your blood sugar less annoying.

### user stories
- user can see their cgm generated data in an organized manner.

- user can see your average over any given span as well as your highest peak.

- user can see device info about their transmitter.

- user can see their egvs data in a chart

### goals

- MERN stack
- chart js
- Dexcom developer api

### Technologies Used

- `Node js` to serve as the controllers and views using `ejs`.

- `Sass` to handle views and partials views.

- `MongoDB` to handle user instance storage and to create instance id.

##### dependencies

- express
  - to handle third party requests i used http and querystring
- cookie-session
  - to handle user sesssion
- moment
  - to clean up date information and format date input
- passport
  - to handle Oauth.2 authentication with Dexcom API
- passport-oauth2
  - passport strategy for handling RFC 6749 Oauth
