window.onload = function () {
    setTimeout(function () {

        // მასივში ვინახავ მომხარებლის ინფორმაციას : აიდი , პაროლი , ბალანსი
        let userData = [
            [1598, 1598, "ლევანი", 7000.45],
            [8951, 1598, "გიორგი", 8710.12],
            [2100103, 2212, "ლუკა", 1450],
        ];


        let userExists = false;

        alert("მოგესალმებათ ძუნწი ბანკი , გთხოვთ შეიყვანოთ მომახრებლის პირადი მონაცემები");
        console.log("მოგესალმებათ ძუნწი ბანკი , გთხოვთ შეიყვანოთ მომახრებლის პირადი მონაცემები");

        let userID = parseInt(prompt("შეიყვანეთ პირადი ნომერი"));


        if (!isNaN(userID)) {
            // მომხარებლის აიდი თუ არსებობს შემოწმება , (მასივებში 0 იან ინდექსის ელემენტებთან)
            for (let i = 0; i < userData.length; i++) {
                if (userData[i][0] === userID) {
                    userExists = true;
                    break;
                }
            }

            if (userExists) {
                // არასწორი პაროლის მცდელობები, მაქს სამი
                let currentAttempt = 0;
                const maxAttempt = 3;

                while (currentAttempt < maxAttempt) {
                    let isPasswordCorrect = false;

                    let password =  parseInt(prompt("გთხოვთ შეიყვანოთ პაროლი:"));

                    if (password) {
                        for (let i = 0; i < userData.length; i++) {
                            if (userData[i][0] === userID && userData[i][1] === password) {
                                isPasswordCorrect = true;
                                break;
                            }
                        }

                        if (isPasswordCorrect) {

                            let UserName;


                            for (let i = 0; i < userData.length; i++) {
                                if (userData[i][0] === userID) {
                                    UserName = userData[i][2];
                                    break;
                                }
                            }

                            alert("ავტორიზაცია წარმატებულია!  მოგესალმებით ბატონო : " + UserName);
                            console.log("ავტორიზაცია წარმატებულია!  მოგესალმებით ბატონო : " + UserName);

                            /// ავტორიზაციის შემდეგ ოპერაციები ,   ბალანსი , შეტანა,  გატანა,   (5 ცდა აქვს რომ სწორად შეიყვანოს ოპერაციის ტიპი) 
                            let operationType;
                            let attempts = 0;
                            let maxAttempts = 10;

                            while (attempts < maxAttempts) {
                                operationType = prompt("გთხოვთ შეიყვანოთ ოპერაციის ტიპი: (ტიპები: შეტანა; გატანა; ბალანსი ;  გასვლა)");
                                if (operationType && (operationType === 'შეტანა' || operationType === 'გატანა' || operationType === 'ბალანსი' || operationType === 'გასვლა')) {
                                    break;
                                } else {
                                    attempts++;
                                    alert("არასწორი ოპერაციის ტიპი!");
                                    console.log("არასწორი ოპერაციის ტიპი!");

                                }
                            }

                            //// არასწორის ოპერაციის ტიპების ამოწურვის შემდეგ, ვაგდებ სისტემიდან
                            if (attempts === maxAttempts) {
                                alert(" ამოიწურა არასწორი ოპერაციის მცდელობები . გთხოვთ დააჭიროთ F5-ს");
                                console.log(" ამოიწურა არასწორი ოპერაციის მცდელობები . გთხოვთ დააჭიროთ F5-ს");

                                break;

                            } else {
                                let currentBalance = checkBalance(parseInt(userID));


                                //// ოპერაციის ტიპების შესაბამისად ქეისები
                                switch (operationType.toLowerCase()) {
                                    case 'შეტანა':
                                        deposit(currentBalance, userID);
                                        break;

                                    case 'გატანა':
                                        withdraw(currentBalance, userID);
                                        break;
                                    case 'ბალანსი':
                                        alert("თქვენი მიმდინარე ბალანსი შეადგენს: " + currentBalance);
                                        console.log("თქვენი მიმდინარე ბალანსი შეადგენს: " + currentBalance);

                                        break;
                                    case 'გასვლა':
                                        alert("ნახვამდის <3 ");
                                        break;
                                }
                            }
                            break;
                        } else {

                            ///არასწორი პაროლის შემთხვეაში
                            currentAttempt++;
                            alert("მომხმარებლის პაროლი არასწორია!");
                            console.log("მომხმარებლის პაროლი არასწორია!");

                        }
                    } else {
                        alert("პაროლის შეყვანა სავალდებულოა, გთხოვთ დააჭიროთ F5-ს");
                        console.log("პაროლის შეყვანა სავალდებულოა, გთხოვთ დააჭიროთ F5-ს");

                        break;
                    }
                }

                if (!isPasswordCorrect) {
                    alert("თქვენ ამოწურეთ არასწორი პაროლის მცდელობები, გთხოვთ დააჭიროთ F5-ს");
                    console.log("თქვენ ამოწურეთ არასწორი პაროლის მცდელობები, გთხოვთ დააჭიროთ F5-ს");

                }
            } else {
                alert("მომხარებელი არ მოიძებნა!! გთხოვთ დააჭიროთ F5-ს");
                console.log("მომხარებელი არ მოიძებნა!! გთხოვთ დააჭიროთ F5-ს");

            }
        } else {
            alert("შეყვანილი პირადი ნომერი არ არის ვალიდური! გთხოვთ დააჭიროთ F5-ს");
            console.log("შეყვანილი პირადი ნომერი არ არის ვალიდური! გთხოვთ დააჭიროთ F5-ს");

        }




        /////  ბალანსის შემოწმების ფუნქცია,   პარამეტრი - იუზერ აიდი
        function checkBalance(user) {
            const userBalance = userData.find(userInfo => userInfo[0] === user)?.[3];
            return userBalance !== undefined ? userBalance : "შეცდომა, მომხარებელი არ მოიძებნა";
        }
        

        ///// თანხის შეტანის ფუნქცია
        function deposit(current_balance, user) {

            attempts = 0;
            maxAttempts = 10;

            while (attempts < maxAttempts) {
                let deposit_amount = parseFloat(prompt("თქვენი მიმდინარე ბალანსი შეადგენს " + current_balance + " გთხოვთ შეიყვანოთ თანხის ოდენობა რისი შეტანაც გსურთ:"));



                if (!isNaN(deposit_amount) && deposit_amount > 0) {
                    let balance = checkBalance(user);

                    ///არსებულ ბალანს ვამატებ  ,  შეტანილ თანხას
                    balance += deposit_amount;
                    for (let i = 0; i < userData.length; i++) {
                        if (userData[i][0] === parseInt(user)) {
                            userData[i][3] = balance;
                            break;
                        }
                    }
                    alert("თანხის შეტანა წარმატებით მოხდა, ბალანსი ანგარიშზე: " + balance);
                    console.log("თანხის შეტანა წარმატებით მოხდა, ბალანსი ანგარიშზე: " + balance);

                    break;

                } else {

                    attempts++;
                    alert("არასწორი ოპერაციის ტიპი!");
                    console.log("არასწორი ოპერაციის ტიპი!");

                }
            }

            if (attempts === maxAttempts) {
                alert(" ამოიწურა არასწორი ოპერაციის მცდელობები . გთხოვთ დააჭიროთ F5-ს");
                console.log(" ამოიწურა არასწორი ოპერაციის მცდელობები . გთხოვთ დააჭიროთ F5-ს");

            }

        }

        //// თანხის გატანის ფუნქცია
        function withdraw(current_balance, user) {
            const maxWithdrawal = 5000;

            attempts = 0;
            maxAttempts = 10;

            while (attempts < maxAttempts) {
                let withdraw_amount = parseFloat(prompt("შეიყვანეთ თანხის ოდენობა, რისი გატანაც გსურთ:"));


                ////  ვალიდაციას ვაკეთებ რომ ნულს ზემოთ თანხა შეიყვანოს,  ასევე შეზღუდვა რომ 5000 ზე მეტი არ იყოს თანხა
                if (!isNaN(withdraw_amount) && withdraw_amount <= maxWithdrawal && withdraw_amount > 0) {
                    let balance = checkBalance(user);


                    /// გასატანი თანხის ოდენობას ვადარებ, ბალანსზე არსებულ თანხის ოდენობას
                    if (withdraw_amount <= balance) {
                        balance -= withdraw_amount;


                        for (let i = 0; i < userData.length; i++) {
                            if (userData[i][0] === parseInt(user)) {
                                userData[i][3] = balance;
                                break;
                            }
                        }

                        alert("თანხის გატანა წარმატებულია ,   დარჩენილი ბალანსი ანგარიშზე: " + balance);
                        console.log("თანხის გატანა წარმატებულია ,   დარჩენილი ბალანსი ანგარიშზე: " + balance);

                        break;
                    } else {
                        alert("არასკმარისი თანხა ბალანსზე !!");
                        console.log("არასკმარისი თანხა ბალანსზე !!");

                    }
                } else {
                    attempts++;
                    alert("გთხოვთ შეიყვანოთ თანხის სწორი მნიშვნელობა,   ერთჯერადად განაღდების მაქსიმალური ლიმიტი - 5000");
                    console.log("გთხოვთ შეიყვანოთ თანხის სწორი მნიშვნელობა,   ერთჯერადად განაღდების მაქსიმალური ლიმიტი - 5000");

                }
            }

            if (attempts === maxAttempts) {
                alert(" ამოიწურა არასწორი ოპერაციის მცდელობები . გთხოვთ დააჭიროთ F5-ს");
                console.log(" ამოიწურა არასწორი ოპერაციის მცდელობები . გთხოვთ დააჭიროთ F5-ს");

            }
        }







    }, 500);
};
