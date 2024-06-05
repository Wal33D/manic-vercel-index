# Manic Miners Catalog

A serverless function for hosting and managing the Manic Miners content catalog, hosted at [index.manicminers.net](http://index.manicminers.net).

## Description

Manic Miners Catalog is a Vercel-hosted serverless function designed to provide seamless access to various game assets for Manic Miners, such as levels, game versions, and more. It utilizes MongoDB for efficient data storage and retrieval, offering robust querying capabilities to fetch detailed catalog indices based on specified parameters.

## Key Features

- 🌐 **Serverless Architecture:** Powered by Vercel for scalability and ease of deployment.
- 📊 **Efficient Querying:** Access game content like levels and versions with flexible query parameters.
- 💾 **Robust Data Storage:** Uses MongoDB for efficient storage and retrieval.
- 🔍 **Detailed Catalog Indices:** Fetches detailed indices of the catalog content.
- 🔗 **Easy Integration:** Seamlessly integrates with other services and applications.

## Usage

Deploy this function on Vercel, configure your MongoDB credentials, and start managing your Manic Miners catalog effortlessly. Access the hosted catalog at [index.manicminers.net](http://index.manicminers.net).

## Setup and Deployment

### Prerequisites

- Node.js
- Vercel account
- MongoDB instance

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Wal33D/manic-vercel-index.git
   cd manic-vercel-index
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the project and add the following environment variables with your MongoDB credentials:

```env
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_CLUSTER=your_db_cluster
```

### Deployment

1. Deploy the function to Vercel:

   ```bash
   vercel deploy
   ```

2. Your serverless function should now be live and accessible at the provided Vercel domain.

## API Endpoints

### `GET /api/index`

Retrieve catalog content based on query parameters.

#### Query Parameters

- `catalog` (required): The name of the catalog.
- `catalogType` (required): The type of the catalog.
- `catalogId` (optional): The ID of the catalog item.
- `_id` (optional): The MongoDB ObjectId of the catalog item.

#### Example Request

```http
GET https://index.manicminers.net/?catalog=community&catalogType=level
```

or

```http
GET https://manic-catalog-index-git-main-wal33ds-projects.vercel.app/?catalog=community&catalogType=level
```

#### Example Response

```json
{
  "data": {
    "catalog": "levels",
    "catalogType": "community",
    "count": 5,
    "levels": [
      {
        "_id": "6660c9df1ebe3a905a064bb8",
        "catalog": "hognose",
        "catalogType": "level",
        "catalogId": 11742049542818,
        "preRelease": false,
        "...": "..."
      }
    ]
  },
  "isError": false
}
```

## Project Details

- **GitHub Repository:** [https://github.com/Wal33D/manic-vercel-index](https://github.com/Wal33D/manic-vercel-index)
- **Vercel Project Name:** manic-catalog-index
- **Vercel Project ID:** prj_f4NLwaLOWtp11qpIURqQF0unFsT6
- **Domain:** [https://index.manicminers.net/](https://index.manicminers.net/)
- **Project Release:** [https://manic-catalog-index-git-main-wal33ds-projects.vercel.app/](https://manic-catalog-index-git-main-wal33ds-projects.vercel.app/)

Made with ❤️ for the Manic Miners community by Waleed Judah.
