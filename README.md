# 🔁 Skill Recommender Web App

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-API-lightgrey)](https://flask.palletsprojects.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com/)
[![License: MIT]()](LICENSE)

---

## 📘 Overview

**Skill Recommender** is a full-stack web application designed to help users discover new skills by recommending similar or related skills based on what they want to learn. It works on the idea of **skill bartering**, where users can find relevant skills by comparing them with others using **cosine similarity**.

The backend is powered by two technologies:

- 🧠 **Python Flask API** — Handles advanced similarity operations.
- ⚙️ **Node.js + EJS** — Manages frontend rendering, MongoDB data fetching, and user interactions.

---

## 🎯 Use Case

> If a user wants to learn **Digital Marketing**, the system will search the skill database and suggest the most similar skills like **SEO**, **Email Marketing**, or **Content Creation**, using text similarity analysis.

This makes it easier for users to find and barter skills, helping them grow their capabilities by exchanging knowledge with others.

---

## 🧠 How It Works

1. Users input the skill they want to learn.
2. The **Node.js backend** sends this input to the **Flask similarity API**.
3. The **Flask API** uses **cosine similarity** to compare the input with skills stored in **MongoDB**.
4. The most similar skill(s) are returned and displayed using **EJS templates** on the frontend.

---

## 🛠️ Tech Stack

| Component         | Technology               |
|------------------|--------------------------|
| Frontend         | EJS + HTML + CSS         |
| Backend (App)    | Node.js + Express.js     |
| Recommendation   | Python + Flask           |
| Similarity Model | Cosine Similarity (Scikit-learn) |
| Database         | MongoDB                  |

---

## 🖼️ Project Preview

### 🌐 Web App Screenshot
![App UI](images/app-screenshot.png)

### 🔁 Recommendation Flow
![Flowchart](images/recommendation-flow.png)

---

## 📂 Project Structure

