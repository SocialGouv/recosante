from ecosante.extensions import celery
from ecosante.newsletter.tasks.import_in_sb import import_send_and_report  # noqa

# Check if the script is the main program and if so, execute import_send_and_report directly
if __name__ == "__main__":
    print("This script IS the main program")
    # Directly call the import_send_and_report task
    import_send_and_report.apply_async(
        args=[],
        kwargs={'type_': 'quotidien', 'force_send': True, 'report': True},
        queue='send_newsletter',
        routing_key='send_newsletter.import_send_and_report'
    )
else:
    print("This script is not the main program")
