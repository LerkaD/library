# Generated by Django 5.2.4 on 2025-07-22 20:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_author_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="publish_date",
        ),
    ]
