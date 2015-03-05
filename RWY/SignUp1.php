<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='UTF-8'>
        <!-- 
        Dalton James, Dalton_James@student.uml.edu   
        Jared Perreault, Jared_Perreault@student.uml.edu
        Kyle White, Kyle_White@student.uml.edu

        UMass Lowell Computer Science
        Students in Jesse Heines GUI Programming II
        
        File: SignUp.html
        
        Description: SignUp page for users to input their account info
        
        -->

        <title>Sign Up</title>

        <!-- css link -->
        <link href="css/SignUp_style.css" rel="stylesheet" type="text/css">

        <script src="http://code.jquery.com/jquery-2.1.1.js"></script>

        <!-- js link -->
        <script src="SignUp.js"></script>

    </head>
    <body>
	
	<?php include ("header.html"); ?>


        <h1>Sign Up</h1>
        

        <div id="form_wrapper">

            <!-- a form for the sign up info, the action sends the info to a file to be processed-->
            <form id="SignUp_form" action="javascript:void(0)">

                <h2>Enter Your Information</h2>

                <div class="form_ele">
                    <label>First Name</label>
                    <input id="FirstName" name="FirstName" type="text" tabindex="1" required value="f_name" />
                </div>

                <div class="form_ele">
                    <label>Last Name</label>
                    <input id="LastName" name="LastName" type="text" tabindex="2" required value="l_name" />
                </div>

                <div class="form_ele">
                    <label>Username</label>
                    <input id="Username" name="Username" type="text" tabindex="3" required value="u_name" />
                </div>

                <div class="form_ele">
                    <label>Email</label>
                    <input id="Email" name="Email" type="email" tabindex="4" required value="email@email" />
                </div>
                
                <div class="form_ele">
                    <label>Password</label>
                    <input id="Password" name="Password" type="password" tabindex="5" required value="pw" />
                </div>

                <div class="form_ele">
                    <label>Confirm Password</label>
                    <input id="c_Password" name="c_password" type="password" tabindex="6" required value="pw" />
                </div>

                

                <input id="submit_box" type="submit" tabindex="7" value="Sign Up" />
                
            </form>
        </div> <!-- End form_wrapper div -->       

        <div id="image">
            <img src="awesome-american-eagle.jpg" alt="American Eagle" width="252" height="200" />        
        </div> <!-- end umage div -->   

    </body>
</html>

