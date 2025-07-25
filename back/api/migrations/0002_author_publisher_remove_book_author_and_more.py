# Generated by Django 5.2.4 on 2025-07-21 09:58

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Author",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(default="Unknown Author", max_length=255),
                ),
                ("birthdate", models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Publisher",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("address", models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name="book",
            name="author",
        ),
        migrations.RemoveField(
            model_name="book",
            name="description",
        ),
        migrations.AddField(
            model_name="book",
            name="genres",
            field=models.CharField(
                choices=[
                    ("g1", "g_1"),
                    ("g2", "g_2"),
                    ("g3", "g_3"),
                    ("g4", "g_4"),
                    ("g5", "g_5"),
                ],
                default="g1",
                max_length=2,
            ),
        ),
        migrations.AddField(
            model_name="book",
            name="publish_date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name="book",
            name="title",
            field=models.CharField(default="Untitled Book", max_length=255),
        ),
        migrations.AddField(
            model_name="book",
            name="authors",
            field=models.ManyToManyField(
                related_name="books", to="api.author"
            ),
        ),
        migrations.CreateModel(
            name="AuthorProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("biography", models.TextField(blank=True, default="")),
                (
                    "author",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profile",
                        to="api.author",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="book",
            name="publisher",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="api.publisher",
            ),
        ),
    ]
