#!/usr/bin/env python3
"""
Simple test script to check if the backend is working
"""

import requests
import json

def test_backend():
    """Test if the backend is running and responding"""
    try:
        # Test health endpoint
        print("Testing backend health...")
        response = requests.get('http://localhost:8000/health', timeout=5)
        print(f"Health check status: {response.status_code}")
        print(f"Health check response: {response.json()}")
        
        # Test text analysis endpoint
        print("\nTesting text analysis...")
        test_data = {
            "text": "This is a test news article about climate change.",
            "title": "Test Article"
        }
        
        response = requests.post(
            'http://localhost:8000/analyze/text',
            json=test_data,
            timeout=10
        )
        
        print(f"Analysis status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Analysis result: {result.get('verdict', 'Unknown')}")
            print(f"Confidence: {result.get('confidence', 'Unknown')}")
            print("✅ Backend is working correctly!")
        else:
            print(f"❌ Analysis failed: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error testing backend: {e}")

if __name__ == "__main__":
    test_backend()
