<html>

<head lang="en">
	<meta charset="UTF-8">
	<title>header</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

</head>

<body>

	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Brand</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

				<form class="navbar-form navbar-left" role="search">

					<div class="col-lg-6">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search coming soon">
							<span class="input-group-btn">
								<button class="btn btn-default" type="button">search</button>
							</span>
						</div>
						<!-- /input-group -->
					</div>
					<!-- /.col-lg-6 -->

				</form>

				<p class="navbar-text">Red White and Youth</p>

				<a href ="SignUp.html" class="btn btn-default navbar-btn" >Sign Up</a>

				<button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#myModal">Login</button>

			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</nav>

	</div>
	<!--Enter Modal Here -->
	<div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">Login</h4>
				</div>
				<div class="modal-body">
					 
					 <form id="login_form" action="javascript:void(0)">
						<div class="form_ele">
							<label>Username</label>
							<input id="Username" name="Username" type="text" tabindex="1" required value="u_name" />
						</div>
						<div class="form_ele">
							<label>Password</label>
							<input id="Ipassword" name="Ipassword" type="password" tabindex="2" required value="pw" />
						</div>	
					
						<input type="submit" id="submit-button" class="hidden"/>						

					</form>
				
				</div>
			
				<div class="modal-footer">
					<button id="submit_login" type="button" class="btn btn-default" >Login</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

	
	<script type="text/javascript">
		$(document).ready( function() {

			$("#login_form").submit( function(event) {
			
				var $this = $(this);
				formData = $this.serialize();
				
				console.log("formData = " + formData );
				
				console.log( "Username = " + $("#Username").val() );
				console.log( "password = " + $("#Ipassword").val() );
				
				$.get("validate_login.php", formData, function (data) {
					console.log("success");
					
					console.log("data = " + data);
				});
				
				
			});
			
			$("#submit_login").click( function() {
				//trigger click instead of submit so html5 required attribute works
				$("#submit-button").trigger("click");
			});

		}); //end of doc.ready
	</script>
	
	
	
</body>

</html>