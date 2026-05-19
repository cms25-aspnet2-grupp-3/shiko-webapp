export function getCurrentUser() {
    if (typeof window === "undefined") {
        return "You"; 
    }
    
    return new URLSearchParams(window.location.search).get("user") ?? "You";
}