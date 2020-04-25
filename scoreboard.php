<html>
    <head>
        <meta charset='utf-8'>

        <title>Tetris - score</title>

        <link rel="shortcut icon" href="favicon.png" type="image/x-icon">
        <link rel='stylesheet' type='text/css' media='screen' href='css/main.css'>
    </head>

    <body>
        <div class="nav">
            <a class="scoreboard" href="/">New Game</a>
            <a class="github" href="https://github.com/lukasfessl/tetris" target="_blank">
                <img width="25px" height="25px" src="./img/github.png" title="github">
            </a>
        </div>
        <div class='content'>

            <?php

            extract(include 'config.php');
            $pdo = new PDO($dsn, $user, $password);

            $limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? $_GET['limit'] : 10;
            $stm = $pdo->query("SELECT * FROM score ORDER BY score DESC limit " . $limit)->fetchAll();
        
            echo "<div class='bg'>";
            echo "<h3>Scoreboard</h3>";
            echo "<table class='score'>";
            echo "<thead><tr><th scope='col'>#</th><th scope='col'>Name</th><th scope='col'>Score</th><th scope='col'>Level</th></tr></thead>";
            $i = 0;
            foreach ($stm as $row) { 
                $i++;
                echo "<tr><td>" . $i . "</td><td>" . $row['name'] . "</td><td>" . $row['score'] . "</td><td>" . $row['level'] . "</td></tr>";
            }
            echo "</table>";
            echo "</div>";
            ?>
        </div>

        <footer>
            <p>© Lukáš Fessl 2020</p>
        </footer>
    </body>
</html>