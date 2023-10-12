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

# Sentiment testing
def test_fetch_sentiment(client):
    # Define the input data for testing
    input_data = {"text": "I am happy."}

    # Test case for a successful POST request to /api/sentiment/process
    response = client.post("/api/sentiment/process", json=input_data)

    # Assert the response status code is 200 OK (or the desired status code)
    assert response.status_code == 200

    # Assert the response contains expected data or structure
    # You can assert specific JSON keys or the response structure based on your API
    assert "sentiment" in response.json()
    assert "score" in response.json()

    # Assert that 'sentiment' = "Positive"
    expected_sentiment = "Positive"
    assert response.json()["sentiment"] and response.json()["sentiment"] == expected_sentiment

    # Assert that 'score' = {exact decimal}
    expected_score = 0.9796596169471741
    assert response.json()["score"] and response.json()["score"] == expected_score

# TODO: summary testing
# def test_fetch_summary(client):
