# ADS x MSIB Test Case

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-cd2932?style=for-the-badge&logo=npm&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-5d5685?style=for-the-badge&logo=bun&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### Backend Test Case 3 of ADS Digital Parner x MSIB

Test case for simple online store service.

## Features 💡

- Authentication
- Product Management
- Cart
- Checkout
- Order Management

## Tech Stacks ⚙️

- Node.js (Production/Dockerization)
- Bun (Development)
- Express.js
- MySQL
- Sequelize
- Sequelize CLI
- Joi
- JWT
- Docker
- Docker Compose

## Prerequisites 📋

- Development
  - [x] [Node.js](https://nodejs.org/en) >= 18.0 or [Bun](https://bun.sh/) >= 1.0.19
- Just Trying
  - [x] [Docker](https://www.docker.com/) >= 24.0.7
  - [x] [Docker Compose](https://docs.docker.com/compose/) >= 2.15.1

## API Endpoints 📡

| Service                | Endpoint                  | Method | Used for |
| ---------------------- | ------------------------- | ------ | -------- |
| Seller Register        | `/auth/register/seller`   | POST   | Seller   |
| Customer Register      | `/auth/register/customer` | POST   | Seller   |
| Login                  | `/auth/login`             | POST   | Both     |
| Add Product            | `/products`               | POST   | Seller   |
| Get Products           | `/products`               | GET    | Public   |
| Get Product by ID      | `/products/:id`           | GET    | Public   |
| Add Item to Cart       | `/carts`                  | POST   | Customer |
| Get Cart Items         | `/carts`                  | GET    | Customer |
| Checkout               | `/orders`                 | POST   | Customer |
| Get Orders             | `/orders`                 | GET    | Seller   |
| Get Order Detail by ID | `/orders/:id`             | GET    | Seller   |

For more details, please refer to this [report document](https://drive.google.com/file/d/1nkJyqQOMW3EChLLvDdE_P-vMd0P1Q_WE/view?usp=sharing).

## How to Start ✨

1. Clone and cd to this repo
   ```bash
   git clone https://github.com/tudemaha/ads-testcase
   cd ads-testcase
   ```
2. Run Docker Compose (use `sudo` if necessary)
   ```bash
   docker compose up
   ```
3. Wait until `mysql` and `web` services ready
4. Try API using `http://localhost:8080`
