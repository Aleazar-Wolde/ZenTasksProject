from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# --- Simple AI Model Setup ---
# For demonstration, we'll assume that task duration is related to the length of the description.
# Dummy training data: 
#   X_train: description length (number of characters)
#   y_train: actual duration in minutes
X_train = np.array([[10], [20], [30], [40]])  # example feature values
y_train = np.array([15, 30, 45, 60])           # corresponding target durations

# Create and train a Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# --- Endpoint for Predicting Task Duration ---
@app.route('/predictDuration', methods=['POST'])
def predict_duration():
    # Get JSON data from the request body
    data = request.get_json()
    description = data.get('description', '')
    
    # Create the feature: we use the length of the description as our feature
    feature = np.array([[len(description)]])
    
    # Predict duration using the trained model
    prediction = model.predict(feature)[0]
    
    # Return the predicted duration (rounded to an integer) along with some details
    return jsonify({
        'predictedDuration': int(round(prediction)),
        'details': f'Description length: {len(description)}'
    })

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
