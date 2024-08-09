import json
import os

from flask import (Blueprint, flash, jsonify, redirect, render_template,
                   request, url_for)
from flask_login import current_user
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from ..models import DB
from .forms import LoginForm, SignupForm
from .util import filter_products_by_int, get_json_data

COMLIST_BP = Blueprint(
    "comlist", __name__, url_prefix="/com_list", template_folder="templates"
)


@COMLIST_BP.route("/", methods=["GET", "POST"])
def com_list():
    products = get_json_data()["content"]
    min_points = request.form.get("min_points")
    max_points = request.form.get("max_points")
    user=current_user
    if current_user.is_authenticated:
        is_authenticated = True
        
    else:
        is_authenticated = False

    if request.method == "POST":
        try:
            min_points = int(min_points) if min_points else None
            max_points = int(max_points) if max_points else None

            if min_points is not None or max_points is not None:
                products = filter_products_by_int(
                    products, "points", min_points, max_points
                )
        except ValueError:
            flash("無効な入力値です。数値を入力してください。", "error")

    return render_template(
        "product.html", user=user,products=products, min_points=min_points, max_points=max_points,is_authenticated=is_authenticated
    )


@COMLIST_BP.route("/data")
def get_com_list():
    products = get_json_data()["content"]
    return render_template("test.html", products=products)
