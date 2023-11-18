<?php
// Connect to the MySQL database
$servername = "localhost"; // Change this if your MySQL server is on a different host
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "thewheel"; // Your database name

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['loginSubmit'])) {
    $username = $_POST["userName"];
    $password = $_POST["userPassword"];

    // Check if the user exists in the database
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            // Password is correct, redirect to game.html
            header("Location: game.html");
            exit();
        } else {
            echo "Invalid password";
        }
    } else {
        echo "Invalid user";
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>
