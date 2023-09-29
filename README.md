
<h1 align="center">Welcome to Om Nom 👋</h1>
<p>
  <a href="https://github.com/Syndux/Om-Nom" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

> [Om Nom](https://om-nom.onrender.com/) is a user-friendly and intuitive web application designed to simplify food selection and planning. Let Om Nom help you decide on your culinary choice, expediting the process of tonight's dinner and identifying the ingredients needed to bring your next food quicker to you.

## Technologies Used

Om Nom was built using the following technologies:

- JavaScript
- Express
- Sequelize
- HTML5/CSS
- React
- Redux
- Tailwind

### 🏠 [Homepage](https://om-nom.onrender.com/)

## Table of Contents
- [Installing/Getting Started](https://github.com/Syndux/Om-Nom#installation)
	 - [Initial Configuration](https://github.com/Syndux/Om-Nom#initial-configuration)
- [Screenshots](https://github.com/Syndux/Om-Nom#screenshots)
- [Wiki Documents](https://github.com/Syndux/Om-Nom#wiki-documents)
	- API Routes
 	- Database Schema
 	- Features
 	- Frontend Routes
 	- Redux Store Tree
	- User Stories
- [To-Dos/Future Features](https://github.com/Syndux/Om-Nom#to-dosfuture-features)
- [Technical Implementation Details](https://github.com/Syndux/Om-Nom#technical-implementation-details)
	- [Code Snippets](https://github.com/Syndux/Om-Nom#code-snippets)
- [Author](https://github.com/Syndux/Om-Nom#author)
- [Show your support](https://github.com/Syndux/Om-Nom#show-your-support)

## Installation

### Initial Configuration
#### Express/Sequelize
To install and run this project locally, start off with your backend server.

1. Clone this repository
    ```bash
    git clone https://github.com/Syndux/Om-Nom.git
    ```

2. Install dependencies
    ```bash
    cd backend
    npm install
    ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
    - Make sure the SQLite3 database connection URL is in the **.env** file
    - The env example organizes all tables inside the `schema_name_here` schema, defined
        by the `SCHEMA` environment variable.  Replace the value for
        `SCHEMA` with a unique name, **making sure you use the snake_case
        convention**.
    <br></br>

4. Migrate your database, seed your database, and run your Express app

   ```bash
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
    npm start
   ```
5. Now that you have your backend Flask server running. You need to run the React App in development in a different terminal instance.

#### React
1. Make sure you have a new terminal instance separate from your terminal for your backend. Navigate into the Om Nom project folder and then into react-app folder.
    ```bash
    cd frontend
    ```

2. Install all your dependencies before starting up the application.
    ```bash
    npm install &&
    npm start
    ```

3. Now that you have both your Express backend and React App frontend running, Om Nom is operable.

### Operating
To run the application, navigate into the project folder in two separate terminal windows.

1. Ensure that the database has already been migrated and seeded. If it hasn't been done yet, refer to [Intitial Configuration](https://github.com/Syndux/Om-Nom/blob/main/README.md#initial-configuration)

2. In one terminal, go into backend and run the Express app
    ```bash
    npm start
    ```

3. In the other terminal, start the React app.
    ```bash
    npm start
    ```

4. Om Nom will open in your browser and you can now enjoy using Om Nom. Munch away!

## Screenshots
![Homepage Darkmode](https://github.com/Syndux/Om-Nom/assets/78172054/0724aaf1-c4e8-4f33-9edd-a7bdb5c38329)
![Homepage_Lightmode](https://github.com/Syndux/Om-Nom/assets/78172054/571f2675-53d2-4b6b-800b-d420436a8dd1)

## [Wiki Documents](https://github.com/Syndux/Om-Nom/wiki)
- [API Routes](https://github.com/Syndux/Om-Nom/wiki/Backend-Routes)
- [Database Schema](https://github.com/Syndux/Om-Nom/wiki/Database-Schema)
- [Features](https://github.com/Syndux/Om-Nom/wiki/Feature-List)
- [Frontend Routes](https://github.com/Syndux/Om-Nom/wiki/Frontend-Routes)
- [Redux Store Tree](https://github.com/Syndux/Om-Nom/wiki/Redux-State)
- [User Stories](https://github.com/Syndux/Om-Nom/wiki/User-Stories)

## To-Dos/Future Features

The project is fully functional in its current state, but some other features we would like to implement in the future include:

- Ability to upload images for foods and ingredients with AWS
- Food categories for more sorting options
- Shopping lists for saved meals to plan your next few meals easier


## Technical Implementation Details
### Code Snippets

**Showcase page**
```javascript
    <div className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-135px)] w-full flex-col items-center overflow-hidden rounded-xl bg-main-bg text-center dark:bg-main-dark-bg">
          <h2 className="mt-24 text-3xl font-bold tracking-tight text-main-dark-bg dark:text-main-bg sm:text-4xl">
            Streamline your dinner decision.
            <br />
            Effortless ingredient planning.
          </h2>
          <p className="mx-10 mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300 sm:mx-28">
            Let Om Nom help you bring your next food closer to you.
          </p>       
```

## Author

👤 **Huey Nguyen**
* [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Syndux)
* [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/huey-nguyen/)

## Show your support

Give a ⭐️ if this project helped you!
