from flask import Flask, render_template, request, redirect, session, jsonify
import time
import pandas as pd

from database.excel_db import register_user, login_user, create_database

app = Flask(__name__)
app.secret_key = "smart_exam_secret"

create_database()

# ============================================
# SOAL UJIAN
# ============================================

questions = [
    {
        "id": 1,
        "question": "Kepanjangan CPU adalah...",
        "options": [
            "Computer Processing Unit",
            "Central Processing Unit",
            "Control Program Unit",
            "Central Program Utility"
        ],
        "answer": "Central Processing Unit"
    },
    {
        "id": 2,
        "question": "HTML digunakan untuk...",
        "options": [
            "Membuat struktur website",
            "Database",
            "AI",
            "Operating System"
        ],
        "answer": "Membuat struktur website"
    },
    {
        "id": 3,
        "question": "Python termasuk bahasa...",
        "options": [
            "Low Level",
            "High Level",
            "Assembly",
            "Machine Code"
        ],
        "answer": "High Level"
    },
    {
        "id": 4,
        "question": "HTTP merupakan...",
        "options": [
            "Protocol Web",
            "Database",
            "Operating System",
            "Compiler"
        ],
        "answer": "Protocol Web"
    },
    {
        "id": 5,
        "question": "JavaScript berjalan di...",
        "options": [
            "Browser",
            "Router",
            "Printer",
            "BIOS"
        ],
        "answer": "Browser"
    }
]

# ============================================
# INDEX
# ============================================

@app.route("/")
def index():
    return render_template("index.html")


# ============================================
# REGISTER
# ============================================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        nama = request.form["name"]

        nim = request.form["nim"]

        password = request.form["password"]


        hasil = register_user(
            nama,
            nim,
            password
        )


        if hasil:

            return redirect("/login")


        return render_template(
            "register.html",
            error="NIM sudah terdaftar!"
        )


    return render_template("register.html")


# ============================================
# LOGIN
# ============================================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        nim = request.form["nim"].strip()
        password = request.form["password"].strip()

        user = login_user(nim, password)

        if user is not None:

            session["name"] = user["Nama"]
            session["nim"] = str(user["NIM"])

            session["warning"] = 0
            session["afk"] = 0
            session["score"] = 0
            session["start_time"] = int(time.time())

            return redirect("/exam")

        return render_template(
            "login.html",
            error="NIM atau Password salah!"
        )

    return render_template("login.html")

# ============================================
# HALAMAN UJIAN
# ============================================

@app.route("/exam")
def exam():

    # Cek apakah user sudah login
    if "name" not in session:
        return redirect("/login")

    return render_template(

        "exam.html",

        questions=questions,

        name=session["name"],

        nim=session["nim"],

        warning=session.get("warning",0),

        afk=session.get("afk",0),

        start_time=session["start_time"]

    )


# ============================================
# SMART DETECTOR
# ============================================

@app.route("/update_detector", methods=["POST"])
def update_detector():

    data = request.get_json()

    session["warning"] = data.get("warning",0)

    session["afk"] = data.get("afk",0)

    # Jika warning sudah 3 kali
    if session["warning"] >= 3:

        session["score"] = 0

    # Jika AFK sudah 3 kali
    if session["afk"] >= 3:

        session["score"] = 0

    return jsonify({

        "status":"success"

    })


# ============================================
# SUBMIT UJIAN
# ============================================

@app.route("/submit", methods=["POST"])
def submit():

    score = 0

    for q in questions:

        answer = request.form.get(

            f"q{q['id']}"

        )

        if answer == q["answer"]:

            score += 20

    # Jika terlalu banyak pelanggaran
    if session.get("warning",0) >= 3:

        score = 0

    if session.get("afk",0) >= 3:

        score = 0

    session["score"] = score

    return redirect("/result")


# ============================================
# HASIL
# ============================================

@app.route("/result")
def result():

    if "score" not in session:

        return redirect("/login")

    score = session["score"]

    if score >= 80:

        grade = "A"

    elif score >= 60:

        grade = "B"

    elif score >= 40:

        grade = "C"

    else:

        grade = "D"

    return render_template(

        "result.html",

        name=session["name"],

        nim=session["nim"],

        score=score,

        grade=grade,

        warning=session.get("warning",0),

        afk=session.get("afk",0)

    )


# ============================================
# LOGOUT / RESET
# ============================================

@app.route("/logout")
def logout():

    session.clear()

    return redirect("/")


@app.route("/reset")
def reset():

    session.clear()

    return redirect("/login")


# ============================================

if __name__ == "__main__":

    app.run(debug=True)