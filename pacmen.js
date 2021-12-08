let timeout;
    var pos = 0;
    const pacArray = [
        ['PacMan1.png', 'PacMan2.png'],
        ['PacMan3.png', 'PacMan4.png']
    ];
    const pacMen = []; // This array holds all the pacmen

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        let initialY = position.y;
        if (initialY < 125) {
            console.log("Triggered");
            console.log(position.y);
            position.y += 150
        };
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        // The goal here is to add variables that can be used to make the pacmen open
        // and close their mouths.
        let mouthCounter = 1;
        let mouthIncrement = 1;
        newimg.style.position = 'absolute';
        newimg.src = pacArray[0][0];
        newimg.width = 100;
        newimg.style.left = position.x;
        newimg.style.top = position.y;
        console.log(position.y);

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg,
            mouthCounter, // Incrementing this in update() will allow for open close
            mouthIncrement // Positive or negative based on open or close
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            console.log('----------- update ----------');
            const beforeSrcArray = item.newimg.src.split('/');
            // console.log('before src: ', beforeSrcArray[beforeSrcArray.length - 1])
            // console.log('counter: ', item.mouthCounter, ' | increment: ', item.mouthIncrement)
            checkCollisions(item);
            console.log('--- collision check ---')
            const afterSrcArray = item.newimg.src.split('/');
            // console.log('after src: ', afterSrcArray[afterSrcArray.length - 1])
            // console.log('counter: ', item.mouthCounter, ' | increment: ', item.mouthIncrement)
            //The following determines whether a pacman's mouth is open or closed
            item.mouthCounter += item.mouthIncrement;
            if (item.mouthCounter === 20) {
                item.mouthIncrement = - item.mouthIncrement;
                if (item.velocity.x > 0) {
                    item.newimg.src = pacArray[0][1];
                }
                else {
                    item.newimg.src = pacArray[1][1];
                }
            }
            if (item.mouthCounter === 0) {
                item.mouthIncrement = - item.mouthIncrement;
                if (item.velocity.x > 0) {
                    item.newimg.src = pacArray[0][0];
                }
                else {
                    item.newimg.src = pacArray[1][0];
                }
            }

            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;

            
        })
        timeout = setTimeout(update, 20);
    }

    function checkCollisions(item) {
        
  // Detects collisions with walls and causes Pacmen to reverse direction
  // Also changes the Pacmen images based on which direction they are moving on x axis
    if ((item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) || 
        (item.position.x + item.velocity.x < 0)) {
        item.velocity.x = -item.velocity.x;

        //The following changes which direction the Pacmen are facing on a wall hit
        if ((item.velocity.x < 0) && (item.newimg.src = pacArray[0][0])) {
            console.log('right open when hit')
            item.newimg.src = pacArray[1][0];
        }
        else if ((item.velocity.x < 0) && (item.newimg.src = pacArray[0][1])) {
            console.log('right closed when hit')
            item.newimg.src = pacArray[1][1];
        }
        else if ((item.velocity.x > 0) && (item.newimg.src = pacArray[1][0])) {
            console.log('left open when hit')
            item.newimg.src = pacArray[0][0];
        }
        else if ((item.velocity.x > 0) && (item.newimg.src = pacArray[1][1])) {
            console.log('left closed when hit')
            item.newimg.src = pacArray[0][1];
        };
    };
    if ((item.position.y + item.velocity.y + item.newimg.height > window.innerHeight) || 
        (item.position.y + item.velocity.y < 0)) {
        item.velocity.y = -item.velocity.y;
        };
    
}

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }

    function stop() {
        clearTimeout(timeout);
    }
