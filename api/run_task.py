import os
from dotenv import load_dotenv
load_dotenv()
print(os.getenv('AUTHENTICATOR_SECRET'))
import sys
from ecosante.newsletter.tasks.import_in_sb import import_send_and_report

# Import the Flask app object from your app module.
# Adjust this line based on where your Flask app object is defined.
from ecosante import app

def main():
    print('RUN TASK')

    # Add some basic command-line handling
    if len(sys.argv) > 1 and sys.argv[1] == "production":
        auth_key = "authenticator-secret-key-production"
    else:
        auth_key = "authenticator-secret-key-local"
    print(auth_key)

    # Set up an application context to run your task
    with app.app_context():
        import_send_and_report(type_='quotidien', force_send=True, report=False)

if __name__ == "__main__":
    main()
