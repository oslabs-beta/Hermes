<p align="center">
  <img src="https://github.com/oslabs-beta/Hermes/blob/dev/assets/images/Hermes-A-Gradient-cropped.png?raw=true"/>
</p>

<p align="center">
 A customizable alert manager for Elasticsearch
</p>

---

## Alerts

View and delete existing alert configurations that are continually monitored at your desired frequency. Create alerts by specifying the new alert name, the index pattern to monitor, the frequency at which the Elasticsearch cluster will be searched, the rule to search for in the cluster, and the customized email that will be sent when the Elasticsearch query responds with a hit. Hermes uses Mustache.js which allows you to include any field from the top hit in the body of your alert email.

<p align="center">
  <img src="https://github.com/oslabs-beta/Hermes/blob/dev/assets/images/Alerts-Demo.gif?raw=true"/>
</p>

## Example Email

<p align="center">
  <img src="https://github.com/oslabs-beta/Hermes/blob/dev/assets/images/Example-Email.png?raw=true"/>
</p>

## View Logs

View individual logs using a simple filter.

<p align="center">
  <img src="https://github.com/oslabs-beta/Hermes/blob/dev/assets/images/View-Logs-Demo.gif?raw=true"/>
</p>

## Visualize Logs

Visualize the count of logs that were created every hour over the past two weeks.

<p align="center">
  <img src="https://github.com/oslabs-beta/Hermes/blob/dev/assets/images/Visualize-Logs-Demo.gif?raw=true"/>
</p>

## Index Patterns

Create and delete index patterns so that you can query multiple indices from your Elasticsearch cluster at once.

<p align="center">
  <img src="https://github.com/oslabs-beta/Hermes/blob/dev/assets/images/Index-Patterns-Demo.gif?raw=true"/>
</p>

# Getting started

## Deploying Hermes

Hermes requires your Elasticsearch cluster to already be set up, running, and accessible on port 9200.

Running Hermes the first time:

1. Fork and clone the main branch of this repository
2. Make sure you are in the outer-most directory of the repository in your command line
3. Configure the email account that will send alert messages per the instructions in [Configuring SMTP With Gmail](#configuring-smtp-with-gmail)
4. Run `npm install`
5. Run `npm run build`
6. Run `npm start`
7. Open your web browser to http://localhost:3068

---

## Configuring SMTP With Gmail

1. Create a new Gmail account.
2. Open settings and disable Two-Factor Authentication and allow access in Gmail for less secure apps. Configuring these settings will allow Hermes to send emails on your behalf.
3. Open the `email_smtp.js` file located in the top directory of your cloned repository
4. Enter your new email `Username` and `Password` into the object passed into `Email.send()`

---

## Contributors

Eric Olaya <br />
[LinkedIn](https://www.linkedin.com/in/eric-olaya/) | [Github](https://github.com/eric-olaya)

Jared Lewis <br />
[LinkedIn](https://www.linkedin.com/in/jareddlewis/) | [Github](https://github.com/jaredDlewis/)

Sheldon Johnson <br />
[LinkedIn](https://www.linkedin.com/in/sheldon-johnson-18a512106/) | [Github](https://github.com/avatarwnd)
