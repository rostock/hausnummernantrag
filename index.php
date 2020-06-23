<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="icon" type="image/png" href="https://hausnummer.leichtwind.de/favicon.ico">
    <link rel="stylesheet" href="lib/node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet"  href="lib/mvp-ol-geocoder/dist/ol-geocoder.css">
    <link rel="stylesheet"  href="lib/jquery-ui-1.12.1.custom/jquery-ui.css">
    <link rel="stylesheet" href="css/custom.css">
    
    <title>Hausnummernantrag</title>
  </head>
  <body>
    <header>
      <div class="navbar navbar-dark bg-dark box-shadow">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            <strong>Hausnummernantrag</strong>
          </a>
        </div>
      </div>
    </header>
    <main>  
      <div class="container" id="infoText">
      </div>
      <div class="container" id="Info">
        <div class="py-5 text-center">
          <h2>Hinweis</h2>
          <p class="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
        </div>
      </div>
      <div class="container" id="breadcrumb">
        <nav aria-label="...">
          <ul class="pagination pagination-lg justify-content-center">
            <li class="breadcrumbs page-item page-item-breadcrumb active" formPageId="start" data-toggle="tooltip" title="Anliegen definieren"><a class="page-link" href="#">1</a></li>
            <li class="breadcrumbs page-item page-item-breadcrumb" formPageId="personalMetadata" data-toggle="tooltip" title="persönliche Informationen"><a class="page-link" href="#">2</a></li>
             <li class="breadcrumbs page-item page-item-breadcrumb" formPageId="houseSurface" data-toggle="tooltip" title="Angabe der neuen Gegebenheiten"><a class="page-link" href="#">3</a></li>
            <li class="breadcrumbs page-item page-item-breadcrumb" formPageId="extras" data-toggle="tooltip" title="Bemerkungen und Dateien anfügen"><a class="page-link" href="#">4</a></li>
          </ul>
        </nav>
      </div>  
      <div class="container">
        <div class="col-md-12 order-md-1">
          <form class="needs-validation" novalidate="">
            <div class="container formcontainer" id="start">  
              <span class="d-block p-2 bg-dark text-white mb-3">
                <h4 class="mb-3">Abfrage des Anliegens</h4>
              </span>
              <div class="row mb-3">
                <div class="col"></div>      
                <div class="form-group col-md-4">
                  <div class="btn-group  btn-group-toggle" id="requestFor_01" data-toggle="buttons">
                    <label class="btn btn-lg btn-info active">
                      <input type="radio" name="options" id="option1" value="Antrag einreichen" checked>Antrag einreichen
                    </label>
                    <label class="btn btn-lg btn-info">
                      <input type="radio" name="options" id="option2" value="Antragstatus prüfen">Antragstatus prüfen
                    </label>
                  </div>
                </div>
                <div class="col"></div>      
              </div>  
              <div class="row">
                <div class="form-group col-md-4">
                  <label for="requestFor_02">Antrag für:</label>
                  <select class="form-control" name="typeOfBuilding" id="requestFor_02">
                    <option value="Einfamilienhaus">Einfamilienhaus</option>
                    <option value="Doppelhaushälfte">Doppelhaushälfte</option>
                    <option value="Mehrfamilienhaus">Mehrfamilienhaus</option>
                    <option value="Gebäudekomplex">Gebäudekomplex</option>
                    <option value="Industrieanlage">Industrieanlage</option>
                  </select>
                </div>
              </div>
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item btnPrevious disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                  </li>
                  <li class="page-item btnNext">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="container formcontainer" style="display:none" id="personalMetadata">  
              <span class="d-block p-2 bg-dark text-white">
                <h4 class="mb-3">aktuelle Wohnanschrift</h4>
              </span>  
              <div class="row">
                <div class="form-group col-md-2">
                  <label for="contactFormOf">Anrede</label>
                  <select class="form-control" name="contactFormOf" id="contactFormOf">
                    <option value="Frau">Frau</option>
                    <option value="Herr">Herr</option>
                    <option value="Firma">Firma</option>
                  </select>
                </div>
				<div class="col-md-10 mb-3" id="firmaSet" style="display:none">
                  <label for="firma">Firma</label>
                  <input type="text" class="form-control" name="firma" id="firma" placeholder="" value="" required="true" data-cip-id="firma">
                  <div class="invalid-feedback">
                    Angabe des Firmennamens.
                  </div>
                </div>  
                <div class="col-md-5 mb-3 nameSet">
                  <label for="firstName">Vorname</label>
                  <input type="text" class="form-control" name="firstName" id="firstName" placeholder="" value="" required="true" data-cip-id="firstName">
                  <div class="invalid-feedback">
                    Ein gültiger Vorname muss angegeben werden.
                  </div>
                </div>
                <div class="col-md-5 mb-3 nameSet">
                  <label for="lastName">Nachname</label>
                  <input type="text" class="form-control" name="lastName" id="lastName" placeholder="" value="" required="" data-cip-id="lastName">
                  <div class="invalid-feedback">
                    Ein gültiger Nachname muss angegeben werden.
                  </div>
                </div>
              </div>
			  <div class="mb-3">
                <label for="phone">Telefonnummer</label>
                <input type="phone" class="form-control" name="phone" id="phone" placeholder="+49381381123456" data-cip-id="phone">
                <div class="invalid-feedback">
                  Bitte eine gültige Telefonnummer eintragen, diese wird für eventuell Rückfragen genutzt.
                </div>
              </div>	
              <div class="mb-3">
                <label for="email">E-Mail</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="max.mustermensch@beispiel.de" data-cip-id="email">
                <div class="invalid-feedback">
                  Bitte eine gültige E-Mail Adresse eintragen, diese wird für die Verifizierung und für eventuell Rückfragen genutzt.
                </div>
              </div>

			  <div class="row">
                <div class="col-md-5 mb-3">
                  <label for="address">Straßenname</label>
                  <input type="text" class="form-control" name="address" id="address" placeholder="Beispielstraße" required="" data-cip-id="address">
                  <div class="invalid-feedback">
                    Bitte eine gültige Straße angeben.
                  </div>
				</div>
				<div class="col-md-2 mb-3">
				  <label for="number">Hausnummer</label>
                  <input type="text" class="form-control" name="number" id="number" placeholder="42" required="" data-cip-id="number">
                  <div class="invalid-feedback">
                    Bitte eine gültige Hausnummer angeben.
                  </div>
                </div>
				<div class="col-md-2 mb-3">
				  <label for="numberextra">Hausnummerzusatz</label>
                  <input type="text" class="form-control" name="numberextra" id="numberextra" placeholder="e" required="" data-cip-id="numberextra">
                  <div class="invalid-feedback">
                    Ggebenenfalls einen Hausnummerzusatz angeben.
                  </div>
                </div>  
				<div class="col-md-3 mb-3">
                  <label for="address2">Adresszusatz<span class="text-muted">(Optional)</span></label>
                  <input type="text" class="form-control"name="address2"  id="address2" placeholder="z.B. Hinterhaus" data-cip-id="address2">
                </div>
			  </div>	
			  <div class="row">	
				<div class="col-md-4 mb-3">
                  <label for="zip">Postleitzahl</label>
                  <input type="text" class="form-control" name="zip" id="zip" placeholder="" required="" data-cip-id="zip">
                  <div class="invalid-feedback">
                    Postleitzahl ist notwendig.
                  </div>
                </div>
				<div class="col-md-8 mb-3">
                  <label for="city">Stadt</label>
                  <input type="text" class="form-control" name="city" id="city" placeholder="Rostock" required="" data-cip-id="city">
                  <div class="invalid-feedback">
                    Stadt ist notwendig.
                  </div>
                </div>
			  </div>
              <div class="row">
				<div class="col-md-6 mb-3">
                  <label for="state">Bundesland</label>
                  <select class="custom-select d-block w-100" name="province" id="province" required="" data-cip-id="cIPJQ342845641">
                    <option value="">Wählen...</option>
                    <option>Mecklenburg-Vorpommern</option>
                  </select>
                  <div class="invalid-feedback">
                    Bitte ein gültiges Bundesland wählen.
                  </div>
                </div>  
                <div class="col-md-6 mb-3">
                  <label for="country">Staat</label>
                  <select class="custom-select d-block w-100" name="state" id="state" required="" data-cip-id="cIPJQ342845640">
                    <option value="">Wählen...</option>
                    <option>Deutschland</option>
                  </select>
                  <div class="invalid-feedback">
                    Bitte einen gültigen Staat wählen.
                  </div>
                </div>
              </div>
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item btnPrevious">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                  </li>
                  <li class="page-item btnNext">
                    <a class="page-link " href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="container formcontainer" style="display:none" id="houseSurface">
              <span class="d-block p-2 bg-dark text-white">
                <h4 class="mb-3">Gebäudeinformationen</h4>
              </span>
              <div class="mb-3">
                <label for="flurId">Flurstücksnummer</label>
                <input type="text" class="form-control" name="flurId" id="flurId" placeholder="" required="" data-cip-id="flurId">
                <div class="invalid-feedback">
                  Flurstückssuche, bitte wählen Sie über das Autocomplete das gewünschte Flurstück aus.
                </div>
              </div>
			  <div  class="mb-3">	
				<div class="btn-group" role="group">
  				  <button type="button" value="square" class="btn btn-secondary polygonType">Quadratisch</button>
  				  <button type="button" value="rectangle" class="btn btn-secondary polygonType">Rechteckig</button>
  				  <button type="button" value="lForm" class="btn btn-secondary polygonType">L-Form</button>
				  <button type="button" value="uForm" class="btn btn-secondary polygonType">U-Form</button>
			    </div>
			  </div>
			  <div class="row square formConfig" style="display:none">
				  <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">A</span>
  					</div>
  					<input type="number" class="form-control squareInput" id="squareInputA">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>	  
			  </div>
			  <div class="row rectangle formConfig" style="display:none">
				  <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">A</span>
  					</div>
  					<input type="number" class="form-control rectangleInput" id="rectangleInputA">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>	 
				  <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">B</span>
  					</div>
  					<input type="number" class="form-control rectangleInput" id="rectangleInputB">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>	  
			  </div>
			  <div class="row lForm formConfig" style="display:none">
				  <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">A</span>
  					</div>
  					<input type="number" class="form-control lFormInput" id="lFormInputA">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>
				 <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">B</span>
  					</div>
  					<input type="number" class="form-control lFormInput" id="lFormInputB">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>
				 <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">C</span>
  					</div>
  					<input type="number" class="form-control lFormInput" id="lFormInputC">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>
				 <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">D</span>
  					</div>
  					<input type="number" class="form-control lFormInput" id="lFormInputD">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>	  
			  </div>
			  <div class="row uForm formConfig" style="display:none">
				  <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">A</span>
  					</div>
  					<input type="text" class="form-control">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>
				 <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">B</span>
  					</div>
  					<input type="text" class="form-control">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>
				 <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">C</span>
  					</div>
  					<input type="text" class="form-control">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>
				 <div class="input-group mb-3">
  					<div class="input-group-prepend">
    					<span class="input-group-text">D</span>
  					</div>
  					<input type="text" class="form-control">
  					<div class="input-group-append">
    					<span class="input-group-text">cm</span>
  					</div>
				 </div>	
			  </div>	
              <label for="mapSurface">Gebäudegrundriss</label>  
              <div id="mapSurface" class="map"></div>
			  <textarea name="mapSurfaceValue" id="mapSurfaceValue" style="display:none"></textarea>
              <label for="mapEntry">Gebäudeeingang</label>  
              <div id="mapEntry" class="map"></div>
			  <textarea name="mapEntryValue" id="mapEntryValue" style="display:none"></textarea>
              <nav class="bottomnav" aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item btnPrevious">
                    <a class="page-link btnPrevious" href="#" tabindex="-1">Previous</a>
                  </li>
                  <li class="page-item btnNext">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="container formcontainer" style="display:none" id="extras">
              <span class="d-block p-2 bg-dark text-white">
                <h4 class="mb-3">Sonstiges</h4>
              </span>
              <div class="form-group">
                <label for="fileUpload">Dateiupload</label>
                  <input type="file" class="form-control-file" name="fileUpload" id="fileUpload_0" accept="image/png, image/jpeg">
                  <button class="add_more">+</button>
                </div>
                <div class="form-group">
                  <label for="description">Anmerkungen</label>
                  <textarea class="form-control" name="description" id="description" rows="3"></textarea>
                </div>
              <button class="btn btn-primary btn-lg btn-block" id="createIssueBtn" type="button">Antrag einreichen</button>
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item btnPrevious">
                    <a class="page-link btnPrevious" href="#" tabindex="-1">Previous</a>
                  </li>
                  <li class="page-item disabled">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </form>
        </div>
      </div>
    </main>
    <footer class="text-muted">
      <div class="container">
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>Album example is © Bootstrap, but please download and customize it for yourself!</p>
        <p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
      </div>
    </footer>  
    
    
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="lib/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="lib/jquery-ui-1.12.1.custom/jquery-ui.js"></script>
    <script src="lib/node_modules/@popperjs/core/dist/umd/popper.min.js"></script>
    <script src="lib/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="lib/ol/ol.js"></script>
    <script src="lib/mvp-ol-geocoder/dist/ol-geocoder.js"></script>
    <script src="js/main.js"></script>
    <script src="js/map.js"></script>
    
    <link rel="stylesheet" href="lib/ol/ol.css">
    <link rel="stylesheet" href="css/map.css">
  </body>
</html>