# Generated by Django 3.1.7 on 2022-01-14 02:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='quantity',
            new_name='amount',
        ),
    ]
