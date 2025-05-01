from django.db import models

# Create your models here.
from django.db import models

class Syllabus(models.Model):
    id = models.BigIntegerField(primary_key=True)
    courseCode = models.CharField(max_length=50)
    courseTitle = models.CharField(max_length=255)
    credits = models.CharField(max_length=10)
    semester = models.CharField(max_length=100)
    totalHours = models.CharField(max_length=10)
    category = models.CharField(max_length=100, blank=True)
    prerequisites = models.CharField(max_length=255, blank=True)
    year = models.CharField(max_length=10)
    internalMarks = models.CharField(max_length=10)
    endSemesterMarks = models.CharField(max_length=10)
    durationTheory = models.CharField(max_length=50)
    durationPractical = models.CharField(max_length=50)
    
    outcomes = models.JSONField(default=list)  # List of outcomes (strings)
    units = models.JSONField(default=list)      # List of unit dictionaries
    practicalHours = models.PositiveIntegerField()
    practicalExercises = models.JSONField(default=list)  # List of exercises (strings)
    references = models.JSONField(default=list)          # List of reference dictionaries
    
    designedBy = models.CharField(max_length=255)
    syllabusType = models.CharField(max_length=50)
    courseId = models.BigIntegerField()
    isCourseLink = models.BooleanField(default=False)
    linkedCurriculumId = models.BigIntegerField(null=True, blank=True)
    lastModified = models.DateTimeField()
    status = models.CharField(max_length=50)
    showInDashboard = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.courseCode} - {self.courseTitle}"
