# ==========================================
# 📘 FAKE NEWS DETECTION USING RANDOM FOREST
# Robust and fully error-free for WELFake
# ==========================================

import pandas as pd
import re
import csv
import os
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

def clean_text(text):
    """Clean and preprocess text for analysis"""
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", " ", text)
    text = re.sub(r"[^a-z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def load_dataset(path="WELFake_Dataset.csv"):
    """Load and preprocess the dataset"""
    print("📊 Loading dataset...")
    
    # CSV settings for large files
    csv.field_size_limit(10**7)
    
    # Load dataset with error handling
    df = pd.read_csv(
        path,
        usecols=['title', 'text', 'label'],
        engine='python',
        quoting=csv.QUOTE_ALL,
        on_bad_lines='skip',
        encoding_errors='ignore'
    )
    
    print(f"✅ Dataset loaded. Shape: {df.shape}")
    
    # Clean labels
    df = df[pd.to_numeric(df['label'], errors='coerce').notnull()]
    df['label'] = df['label'].astype(int)
    print(f"✅ Rows with valid labels: {df.shape[0]}")
    
    # Prepare text data
    df['title'] = df['title'].fillna('')
    df['text'] = df['text'].fillna('')
    df['combined'] = df['title'] + " " + df['text']
    df['cleaned'] = df['combined'].apply(clean_text)
    
    print(f"✅ Text preprocessing completed. Final dataset size: {len(df)}")
    return df

def train_model(df, test_size=0.2, random_state=42):
    """Train the Random Forest model"""
    print("🤖 Training Random Forest model...")
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        df['cleaned'], df['label'], 
        test_size=test_size, 
        random_state=random_state, 
        stratify=df['label']
    )
    
    # TF-IDF Vectorization
    print("📝 Creating TF-IDF vectors...")
    vectorizer = TfidfVectorizer(max_features=10000, stop_words='english')
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    
    # Train Random Forest
    print("🌲 Training Random Forest classifier...")
    rf = RandomForestClassifier(
        n_estimators=200,
        random_state=random_state,
        n_jobs=-1
    )
    rf.fit(X_train_tfidf, y_train)
    
    # Evaluate model
    y_pred = rf.predict(X_test_tfidf)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"✅ Model training completed!")
    print(f"🎯 Accuracy: {round(accuracy*100, 2)}%")
    print(f"\n📊 Classification Report:\n{classification_report(y_test, y_pred)}")
    
    return rf, vectorizer, accuracy

def save_models(rf_model, vectorizer, model_path="rf_model.pkl", vectorizer_path="tfidf_vectorizer.pkl"):
    """Save trained models to disk"""
    print("💾 Saving models...")
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(model_path) if os.path.dirname(model_path) else ".", exist_ok=True)
    
    # Save Random Forest model
    with open(model_path, "wb") as f:
        pickle.dump(rf_model, f)
    
    # Save TF-IDF vectorizer
    with open(vectorizer_path, "wb") as f:
        pickle.dump(vectorizer, f)
    
    print(f"✅ Models saved successfully!")
    print(f"   - Model: {model_path}")
    print(f"   - Vectorizer: {vectorizer_path}")

def predict_fake_news(text, rf_model, vectorizer):
    """Predict if news is fake or real"""
    text_clean = clean_text(text)
    text_tfidf = vectorizer.transform([text_clean])
    pred = rf_model.predict(text_tfidf)[0]
    confidence = max(rf_model.predict_proba(text_tfidf)[0])
    
    return {
        "prediction": "FAKE" if pred == 1 else "REAL",
        "confidence": round(confidence, 3),
        "raw_prediction": pred
    }

def main():
    """Main training pipeline"""
    print("🚀 Starting Fake News Detection Model Training")
    print("=" * 50)
    
    # Check if dataset exists
    dataset_path = "WELFake_Dataset.csv"
    if not os.path.exists(dataset_path):
        print(f"❌ Dataset not found: {dataset_path}")
        print("Please download the WELFake dataset and place it in the current directory.")
        return
    
    try:
        # Load and preprocess data
        df = load_dataset(dataset_path)
        
        # Train model
        rf_model, vectorizer, accuracy = train_model(df)
        
        # Save models
        save_models(rf_model, vectorizer)
        
        # Test prediction
        print("\n--- 🔍 Testing Prediction ---")
        sample_news = "The government announced free education for all citizens next year."
        result = predict_fake_news(sample_news, rf_model, vectorizer)
        print(f"Sample: '{sample_news}'")
        print(f"Prediction: {result['prediction']} (Confidence: {result['confidence']})")
        
        print("\n🎉 Training pipeline completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during training: {e}")
        raise

if __name__ == "__main__":
    main()