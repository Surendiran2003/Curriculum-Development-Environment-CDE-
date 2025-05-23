# Generated by Django 4.2.19 on 2025-04-28 10:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Syllabus',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('courseCode', models.CharField(max_length=50)),
                ('courseTitle', models.CharField(max_length=255)),
                ('credits', models.CharField(max_length=10)),
                ('semester', models.CharField(max_length=100)),
                ('totalHours', models.CharField(max_length=10)),
                ('category', models.CharField(blank=True, max_length=100)),
                ('prerequisites', models.CharField(blank=True, max_length=255)),
                ('year', models.CharField(max_length=10)),
                ('internalMarks', models.CharField(max_length=10)),
                ('endSemesterMarks', models.CharField(max_length=10)),
                ('durationTheory', models.CharField(max_length=50)),
                ('durationPractical', models.CharField(max_length=50)),
                ('outcomes', models.JSONField(default=list)),
                ('units', models.JSONField(default=list)),
                ('practicalHours', models.PositiveIntegerField()),
                ('practicalExercises', models.JSONField(default=list)),
                ('references', models.JSONField(default=list)),
                ('designedBy', models.CharField(max_length=255)),
                ('syllabusType', models.CharField(max_length=50)),
                ('courseId', models.BigIntegerField()),
                ('isCourseLink', models.BooleanField(default=False)),
                ('linkedCurriculumId', models.BigIntegerField(blank=True, null=True)),
                ('lastModified', models.DateTimeField()),
                ('status', models.CharField(max_length=50)),
                ('showInDashboard', models.BooleanField(default=True)),
            ],
        ),
    ]
