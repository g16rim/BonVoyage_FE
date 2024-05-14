<script setup>

</script>

<template>
    <nav class="navbar navbar-expand-lg" style="background-color: #e2caa7;">
        <div class="container-fluid mx-3" style="background-color: #e2caa7;">
           
            <img class="logo1" src="/src/assets/logo/logo1.png" alt="" srcset="">
            <a class="navbar-brand luckiest-guy-regular"  href="#" style="padding-left: 50px;">BUBBLE <br>TRIP</a>
            
            <div class="bubble-container">
                <img class="bubble" src="/src/assets/logo/bubble.png" alt="" srcset="">
                <div class="blink">
                    <p class="pop luckiest-guy-regular">POP!</p>
                </div>
            </div>

            <!-- <img class="bubble" src="/src/assets/logo/bubble.png" alt="" srcset="">
            <div class="blink" ><p class="pop  luckiest-guy-regular">POP!</p></div>
 -->

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="d-flex justify-content-center mx-auto mb-2 mb-lg-0" role="search">
                    <input class="form-control me-2" type="search" placeholder="떠나요" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">ok</button>
                </form>
                <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link">로그인</router-link>

                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav{

    width: 100%;
    .logo1{
        height: 500px;
    }
    height: 500px;
    a{
        font-size: 100px;
        padding-right: 300px;
    }
    
}

@keyframes blink-effect {
  50% {
    opacity: 0;
  }
}

.blink {
    
    width: 200px;
    height: 50px; 
    animation: blink-effect 1s step-end infinite;
    font-size: large;
}

.bubble-container {
    position: relative;
    width: 200px;
    height: auto;
    .bubble:hover{
        cursor: pointer;

    }
}

.bubble-container img{
  width: 150px;
  height: 150px;
  vertical-align: middle;
}

.pop {
    position: absolute;
    top: 40%;
    left: 40%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
    font-size: large; /* 필요에 따라 원하는 크기로 조정 */
    opacity: 1; /* 초기에는 보이지 않도록 설정 */
}

.bubble:hover .pop {
    opacity: 1; /* bubble에 hover시 pop! 텍스트가 나타나도록 설정 */
}


</style>