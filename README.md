[![Stories in Ready](https://badge.waffle.io/codeforkansascity/streetlights.png?label=ready&title=Ready)](http://waffle.io/codeforkansascity/streetlights)

## Streetlight Data

This project is intended to make information about how streetlights across the greater Kansas City metro area are used more transparent and accessible.The Streetlight Data project is an effort to create an aggregated database and map of streetlights and information about how they are used.

**WHY COLLECT DATA ON STREETLIGHTS?**

Smart streetlights are at the front lines of the smart city; the switch from traditional high pressure sodium street lights to LEDs is a proven cost saver for cities that can help to finance smart infrastructure. During this switch, the new light poles become part of the Internet of Things: valuable real estate for hanging cameras, sensors, wireless antennas and more. Streetlights also sit in a public right-of-way, a space that often comes with some precedent of public-private collaboration, meaning that private sector companies and entrepreneurs developing smart city applications can deploy technology on existing infrastructure.

**Problem Statement**
But the data about streetlights right now is not easily accessible on a regional scale, to any of these parties: government, nonprofit, private or resident. Cities don’t know how to value this asset, how to choose which tech goes on which pole or how to negotiate with the private sector. The private sector doesn’t know which poles are available or how best to pilot and deploy their new tools. Additionally, most citizens are unaware of the negotiations underway about this critical public infrastructure.


**Stakeholders**

The direct stakeholder of the Streetlights project is **Code for KC/KC Digital Drive**, though all participating cities will become stakeholders. Eventually local government, entrepreneurs, researchers, private technology companies and engaged citizens will become direct stakeholders as well.

Cities so far that have agreed to share data are **KCMO**, **Lee’s Summit**, and **Gladstone**. **KCP&L** has also shared data on polls they own.

**Mid-America Regional Council (MARC)** is a regional data intermediary who is cooperating in the project as well.
 
**Roadmap/Approach**

**Data discovery:** (IN PROGRESS)

We are working with cities and other streetlight owners to understand first what data they currently collect, how it is stored, and what is available to share. We have collected data in csv form from Lees Summit, KCMO and KCP&L and still asking other cities for data.

**Data integration:** (IN PROGRESS)

We are building a back-end database to store data from multiple city data, preserve privacy and security where necessary, and develop a database maintenance process. We are in progress of creating a master csv file for this data.

**Data visualization:** (IN PLANNING)

We are creating a front-end portal to make these data useful to cities, partners, planners, and residents alike. We are still in progress of deciding which language to use and wireframing our project.

**Team**
- Katherine Hambrick - project lead with KC Digital Drive, manages team day-to-day
- Aaron Deacon - project champion with KC Digital Drive, helps set vision and use case
- Noah Rhee - lead developer, front and back end
- Jon Antel - GIS lead, data cleaning
- Vanessa Huston - GIS expert, data cleaning
- Anwar Jones - front end developer, data cleaning 
- Christian Martin - research, all around project assistant

**How to Contribute / Call to Action**

We are looking for:

- MEAN stack developers to work on the API (right now populating from Google spreadsheet) **visualization**
- Database experts to help determine alternatives to Google spreadsheet **integration**
- Javascript developers **visualizaiton**
- GIS specialists who can read shape files **visualization**
- UX and designers as we start to build a front end for different user groups **visualization**
- Reporters/analysts to work on how to draw meaning from the data and add additional datasets **discovery**

The Streetlights project meets every Monday for Hack Nights at Think Big Partners from 6-8 pm.

Team uses Waffle.io for project management
Project communication on the #streetlights Slack channel
If you are interested, reach out to Katherine Hambrick at khambrick@kcdigitaldrive.org or join our slack.

**Developer Notes**

What we need to do still:
1. Translate data to be the same (schema?)
2. Loading the pole data into the (json) API
3. Loading the metadata into the api
4. API support and design work
5. UI for the API

**Three focus areas (December 4)**

1. Create plan for backend (??)
2. Lee’s Summit and KCMO have two different data formats: Northing and Easting location for poles and long/lat location for poles. We need to unify it in one common format (preferred: latitude and longitude)
3. Examine KCP&L Shapefile: create master list with KCP&L, Lees Summit and KCMO data
4. Front End: We need a front end developer to look at it and agree to write in our language
5. Back End: We need a back end developer to look at it and agree to write in our language

**Other Project Info**
- [Early project documentation](https://docs.google.com/document/d/1DvKDwWAW4RG9BuqUZm0R8CA9r9atJB-fcClTVaI1SME/edit) (user stories, architectural overview, wire frames)
- [Wireframes in Invision](https://projects.invisionapp.com/share/EWDS5MP67#/screens) 
- Mock data: http://mockaroo.com/schemas/8312

---

[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/linnovate/mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# [![MEAN Logo](http://mean.io/wp-content/themes/twentysixteen-child/images/meanlogo.png)](http://mean.io/) MEAN<sup>2</sup>

#### The Full Stack Javascript Framework.

MEAN started out as a combination of MongoDB, ExpressJS, AngularJS and Node.js.   
With <strong>MEAN<sup>2</sup></strong> we are providing the ability to mix and match additional frontend frameworks, databases and technologies.
We aim to create a robust, flexible and scalable full-stack javascript solution.

The default MEAN stack you get out of the box can work with either Angular or React and is built with the following technologies...

* [Node.js](https://nodejs.org/en/)
* [Angular4 web starter](https://github.com/AngularClass/angular-starter)
* [MongoDB](https://www.mongodb.com)
* [Express](https://expressjs.com/)
* [Innograph](https://github.com/linnovate/innograph) (uses GraphQL for schema standartization)
* [Bit](https://bitsrc.io/) - (Manages js components, services and schemas)

If you're looking for the classic angular-1.x version of mean, it has moved to this [1.x branch](https://github.com/linnovate/mean/tree/1.x). 

## Prerequisite Technologies

* [Git](https://git-scm.com/downloads)
* [MongoDB](https://www.mongodb.org/downloads)
* [Node 6.x](https://nodejs.org/en/download/)
* npm 3.x ( or yarn)

> If you have an older version of Node.js and NPM, you can use Node Version Manager [NVM](https://github.com/creationix/nvm) to use multiple node versions on your system. MEAN<sup>2</sup> only supports Node 6.x or higher versions.

## Installation

To start your application with MEAN, you need to clone the base MEAN repository from Github. This repository contains all the packages, modules and also a sample code base in order to start and make it easy to develop your application. Following the steps below will guide you to install the latest MEAN version.

```
git clone --depth 1 https://github.com/linnovate/mean.git  
cd mean
npm install  
npm start  
```
If all the packages and modules installed successfully, your default web browser will open and you can see the default MEAN application at `http://localhost:3000`. This is the default port unless you change that manually.

## Additional Tools used in MEAN

* [Mongoose](http://mongoosejs.com/)
* [Bootstrap](http://getbootstrap.com/)
* [Karma](https://karma-runner.github.io/1.0/index.html)
* [Protractor](http://www.protractortest.org/#/)
* [Jasmine](https://jasmine.github.io/)
* [Istanbul](https://istanbul.js.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Webpack](https://webpack.js.org/)
