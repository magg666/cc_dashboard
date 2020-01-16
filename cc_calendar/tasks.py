import datetime
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from cc_dashboard.settings import BASE_DIR


# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']


def get_data_from_calendar(calendar_id, amount):
    """
    Gets data from Google Calendar API
    :param calendar_id:
    :param amount: amount of events to grab
    :return: json data with calendar's events
    """
    cred_path = os.path.join(BASE_DIR, 'cc_calendar/credentials.json')
    credentials = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            credentials = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                cred_path, SCOPES)
            credentials = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(credentials, token)

    service = build('calendar', 'v3', credentials=credentials)

    # Call the Calendar API
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = service.events().list(
        calendarId=calendar_id,
        timeMin=now,
        maxResults=amount,
        singleEvents=True,
        orderBy='startTime').execute()
    events = events_result.get('items', [])
    return format_calendar_data(events)


def format_calendar_data(events):
    """
    Formats data from Google Calendar Api
    :param events: list
    :return: events list
    """
    formatted_events = []
    for event in events:
        if event['start'].get('date'):
            formatted_event = {
                'start': event['start'].get('date'),
                'end': event['end'].get('date'),
                'summary': event['summary'],
                'all_day': True
            }
        else:
            formatted_event = {
                'start': event['start'].get('dateTime'),
                'end': event['end'].get('dateTime'),
                'summary': event['summary'],
                'all_day': False
            }
        formatted_events.append(formatted_event)
    return formatted_events
