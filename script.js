document.addEventListener("DOMContentLoaded", () => {
    const statusText = document.getElementById("status");
    const locationButton = document.querySelector(".location-btn");
    const locationResult = document.createElement("p");
    locationResult.classList.add("location-result");
    document.querySelector(".container").appendChild(locationResult);

    const targetLat = 19.187597261885884;
    const targetLon = 72.97382347250773;
    const allowedDistance = 100; // 100 meters

    let locationEnabled = false;
    let userCoords = null;

    function updateLocationStatus(enabled) {
        if (enabled) {
            statusText.textContent = "ON";
            statusText.classList.remove("off");
            statusText.classList.add("on");
        } else {
            statusText.textContent = "OFF";
            statusText.classList.remove("on");
            statusText.classList.add("off");
            alert("Please turn on your location to use this feature.");
        }
    }

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000; // Radius of Earth in meters
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in meters
    }

    navigator.geolocation.watchPosition(
        (position) => {
            updateLocationStatus(true);
            locationEnabled = true;
            userCoords = position.coords;
        },
        () => {
            updateLocationStatus(false);
            locationEnabled = false;
        },
        { enableHighAccuracy: true, timeout: 5000 }
    );

    locationButton.addEventListener("click", () => {
        if (locationEnabled && userCoords) {
            const distance = getDistance(userCoords.latitude, userCoords.longitude, targetLat, targetLon);
            
            if (distance <= allowedDistance) {
                locationResult.textContent = "You are in area";
                locationResult.style.color = "lime";
            } else {
                locationResult.textContent = "You are not in area";
                locationResult.style.color = "red";
            }
        } else {
            alert("Please enable location first.");
        }
    });
});
