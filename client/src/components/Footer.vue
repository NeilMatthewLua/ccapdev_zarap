<template>
  <div>
    <footer class="page-footer">
        <div class="row footer-content">
          <div class="logo-container col s12">
            <div class="footer-logo"></div>
          </div>
          <div class="col l5 s12">
            <h5 class="footer-text white-text">Contact Us</h5>
            <p class="footer-text white-text">zarap@gmail.com <br>+(8) 552 3877</p>
          </div>
        </div>
        <div class="footer-copyright">
            <p class="copyright-text">© 2020 Eksdee Ebiloj</p>
        </div>
    </footer>
</div>
</template>

<script>
export default {
    Name: "Footer"
}
</script>

<style scoped>
    body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    main {
        flex: 1 0 auto;
    }

    footer {
        z-index: 999 !important; 
        background-color: var(--default-footer-color) !important;
    }

    .page-footer {
        padding: 0px !important; 
    }

    .footer-content {
        padding: 20px 20px;
        margin: 0px !important; 
    }

    .footer-copyright {
        background-color: var(--default-copyright-color) !important; 
    }

    .copyright-text { 
        line-height: 30px !important; 
        text-align: center !important; 
        padding-left: 20px; 
        color: var(--default-footer-color) !important; 
    }

    .footer-logo {     
        height: 100px !important; 
        width: 100px !important; 
        background-image: url('../assets/pictures/logo.png');
        background-size: 100% 100%; 
    }

    @media only screen and (max-width: 600px) {
        .footer {
            width: 100%; 
        }
        .copyright-text, .logo-container, .footer-text {
            padding: 0px; 
            width: 100%; 
            text-align:center; 
        }
        .footer-logo {
            margin: 0 auto; 
        }
    }
</style>