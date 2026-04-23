from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data (delete individually to avoid Djongo ObjectIdField issues)
        for model in [Activity, Leaderboard, Workout, User, Team]:
            for obj in model.objects.all():
                obj.delete()

        # Teams
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Users
        users = [
            User.objects.create(email='ironman@marvel.com', name='Tony Stark', team='marvel'),
            User.objects.create(email='captain@marvel.com', name='Steve Rogers', team='marvel'),
            User.objects.create(email='batman@dc.com', name='Bruce Wayne', team='dc'),
            User.objects.create(email='wonderwoman@dc.com', name='Diana Prince', team='dc'),
        ]

        # Activities
        Activity.objects.create(user=users[0], type='run', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='cycle', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='swim', duration=25, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='yoga', duration=60, date=timezone.now().date())

        # Workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Sprints', description='Sprint 100m x 5', difficulty='hard')

        # Leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
