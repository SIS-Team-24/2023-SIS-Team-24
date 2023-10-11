import pytest
from fastapi.testclient import TestClient
from src.main import app

# To run all tests from the server directory, run `pytest test_route.py`
# To see print statements in the tests while debugging, run `pytest test_route.py -s`

# Create a TestClient instance
# module: the fixture is destroyed during teardown of the last test in the module.
@pytest.fixture(scope="module")
def client():
    # "with" will cause event handlers ('startup' to load models) to run in the tests
    with TestClient(app) as c:
        yield c

# Define tests here

def test_fetch_emotion(client):
    # Define the input data for testing
    input_data = {"text": "This is a test."}

    # Test case for a successful POST request to /api/sentiment/process
    response = client.post("/api/sentiment/process", json=input_data)

    # Assert the response status code is 200 OK (or the desired status code)
    assert response.status_code == 200

    # Assert the response contains expected data or structure
    # You can assert specific JSON keys or the response structure based on your API
    assert "emotions" in response.json()

    # Assert that 'emotions' is an array containing 'anger', 'joy', and 'fear'
    expected_emotions = ['anger', 'joy', 'fear']
    assert response.json()['emotions'] and all(emotion in response.json()['emotions'] for emotion in expected_emotions)

# You can add more test functions for different scenarios

# TODO: sentiment testing
# def test_fetch_sentiment(client):

# Medium length input (400 words) - tests the basic API call works, and we get a response that 'summarises', i.e. shorter than the input.
def test_fetch_summary_input_medium(client):
    from src.model.data_model import SummaryLengthOption
    from test.summary_inputs.medium_len import text

    # Define the input data for testing
    input_data = {
        "text": text,
        "summary_len_option": SummaryLengthOption.DEFAULT.value
        }

    # Test case for a successful POST request to /api/summary/process
    response = client.post("/api/summary/process", json=input_data)

    # Assert the response status code is 200 OK (or the desired status code)
    assert response.status_code == 200

    # Assert the response has a summary component
    assert 'summary' in response.json()

    # Assert the summary length is shorter than the input (can probably refine to a specific ratio, but hard based on tokens)
    assert len(response.json()['summary']) < 0.8 * len(text)


# Short length input (100 words) - tests the basic API call works, and we get a response that 'summarises', i.e. shorter than the input.
def test_fetch_summary_input_short(client):
    from src.model.data_model import SummaryLengthOption
    from test.summary_inputs.short_len import text

    # Define the input data for testing
    input_data = {
        "text": text,
        "summary_len_option": SummaryLengthOption.DEFAULT.value
        }

    # Test case for a successful POST request to /api/summary/process
    response = client.post("/api/summary/process", json=input_data)

    # Assert the response status code is 200 OK (or the desired status code)
    assert response.status_code == 200

    # Assert the response has a summary component
    assert 'summary' in response.json()

    # Assert the summary length is shorter than the input (can probably refine to a specific ratio, but hard based on tokens)
    assert len(response.json()['summary']) < 0.8 * len(text)


# Medium length input (1000 words) - tests the basic API call works, and we get a response that 'summarises', i.e. shorter than the input.
def test_fetch_summary_input_long(client):
    from src.model.data_model import SummaryLengthOption
    from test.summary_inputs.long_len import text

    # Define the input data for testing
    input_data = {
        "text": text,
        "summary_len_option": SummaryLengthOption.DEFAULT.value
        }

    # Test case for a successful POST request to /api/summary/process
    response = client.post("/api/summary/process", json=input_data)

    # Assert the response status code is 200 OK (or the desired status code)
    assert response.status_code == 200

    # Assert the response has a summary component
    assert 'summary' in response.json()

    # Assert the summary length is shorter than the input (can probably refine to a specific ratio, but hard based on tokens)
    assert len(response.json()['summary']) < 0.8 * len(text)

# TODO: Add futher tests for summary (i.e. performance testing, testing length ratios, testing summary length options, testing accuracy or expected outcomes)