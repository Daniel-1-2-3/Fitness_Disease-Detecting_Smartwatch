import json
import random

# Data for three months: January, February, March
months = [("January", 31), ("February", 29), ("March", 31)]  # Days per month (Leap Year)

# Function to generate realistic heart rates for every 5 minutes
def generate_5min_heart_rates():
    heart_rates = []
    for minute_block in range(288):  # 24 hours × 12 (5-minute intervals)
        hour = minute_block // 12
        if 0 <= hour < 6:  # Midnight to 6 AM (Resting)
            heart_rates.append(random.randint(55, 65))
        elif 6 <= hour < 9:  # Morning (Waking up)
            heart_rates.append(random.randint(65, 75))
        elif 9 <= hour < 18:  # Daytime (Active/Exercise)
            heart_rates.append(random.randint(75, 95))
        elif 18 <= hour < 21:  # Evening (Relaxing)
            heart_rates.append(random.randint(70, 85))
        else:  # Night (Preparing for sleep)
            heart_rates.append(random.randint(60, 70))
    return heart_rates

# Generate data for all months in a single flat list
heart_rate_data = {"data": []}
for _, days in months:
    for day in range(days):
        heart_rate_data["data"].extend(generate_5min_heart_rates())

# Save to JSON file
output_file = "three_months_heart_rate_5min.json"
with open(output_file, "w") as file:
    json.dump(heart_rate_data, file, indent=2)

output_file
