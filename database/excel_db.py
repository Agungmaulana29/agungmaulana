import os
import pandas as pd

FILE = "users.xlsx"


def create_database():

    if not os.path.exists(FILE):

        df = pd.DataFrame(

            columns=[

                "Nama",
                "NIM",
                "Password"

            ]

        )

        df.to_excel(FILE, index=False)


def register_user(nama, nim, password):

    create_database()

    df = pd.read_excel(FILE)

    if nim in df["NIM"].astype(str).values:

        return False

    new = pd.DataFrame({

        "Nama": [nama],

        "NIM": [nim],

        "Password": [password]

    })

    df = pd.concat([df, new], ignore_index=True)

    df.to_excel(FILE, index=False)

    return True


def login_user(nim, password):

    create_database()

    # Membaca semua data sebagai string
    df = pd.read_excel(FILE, dtype=str)

    # Menghilangkan nilai kosong dan spasi
    df = df.fillna("")

    df["NIM"] = df["NIM"].str.strip()
    df["Password"] = df["Password"].str.strip()

    nim = str(nim).strip()
    password = str(password).strip()

    user = df[
        (df["NIM"] == nim) &
        (df["Password"] == password)
    ]

    if not user.empty:
        return user.iloc[0]   # Mengembalikan data user

    return None