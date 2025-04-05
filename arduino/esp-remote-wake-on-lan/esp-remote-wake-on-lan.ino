#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <WiFiUdp.h>
#include <WakeOnLan.h>

WiFiUDP UDP;
WakeOnLan WOL(UDP); // Pass WiFiUDP class

// WiFi credentials
const char* ssid = "Airtel_504";
const char* password = "8309251189";
const char* MACAddress = "74:56:3C:AF:A8:5F";

const char* api_url = "https://esppp.06102002.xyz/status";

bool fetchStatus() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(api_url);
        int httpCode = http.GET(); // Send request

        if (httpCode > 0) {
            String payload = http.getString();
            Serial.println("Received: " + payload);

            // Parse JSON
            StaticJsonDocument<200> doc;
            DeserializationError error = deserializeJson(doc, payload);

            if (error) {
                Serial.println("JSON parsing failed");
                return false;  // Default to false if JSON parsing fails
            }

            String status = doc["status"].as<String>();
            return status == "yes";  // Return true if "yes", false otherwise

        } else {
            Serial.println("HTTP request failed");
        }

        http.end();
    }
    return false; // Default to false if request fails
}

void performWOL(bool status) {
    if (status) {
        Serial.println("Performing Wake-on-LAN");
        WOL.sendMagicPacket(MACAddress);
    } else {
        Serial.println("No action performed");
    }
}

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConnected to WiFi!");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
}

void loop() {
    bool status = fetchStatus(); // Fetch boolean status from API
    performWOL(status); // Perform action based on status
    delay(5000); // Check every 5 seconds
}
