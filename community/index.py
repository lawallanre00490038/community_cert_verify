import requests

scrape_certificates = []

for i in range(500):
  try:
    for j in range(500, 1000):
      result = requests.get(f"https://cert.datasciencenigeria.ai/DSNAI0010{j}")
      scrape_certificates.append(result)
      print(result.status_code)
  except Exception as e:
    print("Error: ", e)




# result = requests.get(f"https://cert.datasciencenigeria.ai/")

# print(result.status_code)