<script setup>
import { ref } from 'vue';
import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env
const isModalOpen = ref(false);
const currentPage = ref(0);
const selectedFile = ref(null);

const groupName = ref('');
const groupDescription = ref('');
const groupConcept = ref('');

const pages = [
  { title: 'Step1. 그룹 이름 정하기', content: '<hr/><input type="text" v-model="groupName" placeholder="그룹 이름을 입력하세요" />' },
  { title: 'Step2. 그룹 설명 작성', content: '<hr/><textarea v-model="groupDescription" placeholder="그룹 설명을 입력하세요"></textarea>' },
  { title: 'Step3. 그룹 컨셉 정하기', content: '<hr/><input type="text" v-model="groupConcept" placeholder="그룹 컨셉을 입력하세요" />' },
  { 
    title: 'Step4. 그룹 대표 이미지 정하기', 
    content: `
      <hr/>
      <input type="file" id="file-input" @change="handleFileChange" />
      <p>그룹 대표 이미지를 선택하세요</p>
    ` 
  },
  { title: 'Step5. 그룹 멤버 초대하기', content: '<hr/><p>그룹 설정을 선택하세요</p>' }
];

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const confirmClose = () => {
  if (confirm('작성했던 내용이 사라집니다. 정말 닫으시겠습니까?')) {
    toggleModal();
  }
};

const nextPage = () => {
  if (currentPage.value < pages.length - 1) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  console.log('Selected file:', selectedFile.value);
};

const submitGroup = async () => {
  const formData = new FormData();
  console.log("groupName = ", groupName.value,"is");
  formData.append('groupName', groupName.value);
  formData.append('groupDescription', groupDescription.value);
  formData.append('groupConcept', groupConcept.value);
  if (selectedFile.value) {
    formData.append('file', selectedFile.value);
  }

  try {
    console.log("form = ",formData.get('groupName'));
    const response = await axios.post(VITE_BASE_URL+'/teams', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      alert('그룹이 성공적으로 생성되었습니다.');
      toggleModal();
      fetchMembers();
    }
  } catch (error) {
    console.error('그룹 생성 중 오류 발생:', error);
    alert('그룹 생성에 실패했습니다.');
  }
};
</script>

<template>
  <h1 class="text-center">Bubble Trip 만들기</h1>
  <div class="container">
    <div class="svg-wrapper" @click="toggleModal">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
            <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsa_44037_gr1" x1="32" x2="32" y1="5.75" y2="59.005" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient>
            <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsa_44037_gr1)" d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"></path>
            <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsb_44037_gr2" x1="32" x2="32" y1="5.75" y2="59.005" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff"></stop><stop offset="1" stop-color="#c822ff"></stop></linearGradient>
            <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsb_44037_gr2)" d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"></path>
            <linearGradient id="KJ7ka9GQp0CHqT_2YsWMsc_44037_gr3" x1="32" x2="32" y1="21.75" y2="42.538" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff"></stop><stop offset="1" stop-color="#e6abff"></stop></linearGradient>
            <path fill="url(#KJ7ka9GQp0CHqT_2YsWMsc_44037_gr3)" d="M41,30h-7v-7c0-0.552-0.448-1-1-1h-2c-0.552,0-1,0.448-1,1v7h-7c-0.552,0-1,0.448-1,1v2 c0,0.552,0.448,1,1,1h7v7c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-7h7c0.552,0,1-0.448,1-1v-2C42,30.448,41.552,30,41,30z"></path>
        </svg>
        <div class="bubbles-container">
       
		<svg class="bubbles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 701 1024" style="overflow: visible;">

        <g class="bubbles-large" stroke-width="10">
            <g>
                <g transform="translate(10 940)">
                    <circle cx="200" cy="200" r="200"/>
                </g>
            </g>
            <g>
                <g transform="translate(10 940)">
                    <circle cx="300" cy="300" r="300"/>
                </g>
            </g>
            <g>
                <g transform="translate(10 940)">
                    <circle cx="150" cy="150" r="150"/>
                </g>
            </g>
            <g>
                <g transform="translate(10 940)">
                    <circle cx="200" cy="200" r="200"/>
                </g>
            </g>
            <g>
                <g transform="translate(10 940)">
                    <circle cx="150" cy="150" r="150"/>
                </g>
            </g>
        </g>
        

        <g class="bubbles-small" stroke-width="7">
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35" stroke="black"/>
                </g>
            </g>
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35" stroke="pink"/>
                </g>
            </g>
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35"/>
                </g>
            </g>
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35"/>
                </g>
            </g>
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35"/>
                </g>
            </g>
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35"/>
                </g>
            </g>
            <g>
                <g transform="translate(147 984)">
                    <circle cx="35" cy="35" r="35"/>
                </g>
            </g>
            <g>
                <g transform="translate(376 984)">
                    <circle cx="15" cy="15" r="15"/>
                </g>
            </g>
            <g>
                <g transform="translate(376 984)">
                    <circle cx="15" cy="15" r="15"/>
                </g>
            </g>
            <g>
                <g transform="translate(497 984)">
                    <circle cx="15" cy="15" r="15"/>
                </g>
            </g>
        </g>

    </svg>
	</div>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal-overlay" @click="toggleModal">
    <div class="modal-content" @click.stop>
      <h2>{{ pages[currentPage].title }}</h2>
      <div v-html="pages[currentPage].content"></div>
      <div class="modal-navigation">
        <button v-if="currentPage > 0" class="prev-button" @click="prevPage">이전</button>
        <button v-if="currentPage < pages.length - 1" class="next-button" @click="nextPage">다음</button>
        <button v-if="currentPage === pages.length - 1" class="confirm-button" @click="submitGroup">완료</button>
      </div>
      <p class="page-info"> {{ currentPage + 1 }} / {{ pages.length }}</p>
    </div>
  </div>
</template>
<style scoped>


.bubbles-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    max-width: 15rem;
    transform: translateX(-50%);
	opacity: 0.75;
	overflow: visible;

}

.bubbles {
	width: 100%;
	height: auto;
	
	circle {
		stroke: rgba(0, 0, 0, 0.089);
		fill: white;
	}
	> g > g:nth-of-type(2n) circle {
		stroke: rgb(180, 188, 224);
    fill: rgb(180, 188, 224);
	}

	> g > g:nth-of-type(3n) circle {
		stroke: rgb(87, 190, 238);
    fill: rgb(87, 190, 238);
	}
	
	> g > g:nth-of-type(4n) circle {
		stroke: #11b2f1;
    fill: #11b2f1;
	}
	
}

.bubbles-large {
	overflow: visible;

	> g {
		transform: translateY(2048px);
		opacity: 0;
		will-change: transform, opacity;
	}

	g:nth-of-type(1) {
		animation: up 6.5s infinite;
		
		g {
			transform: translateX(350px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}
	
	g:nth-of-type(2) {
		animation: up 5.25s 250ms infinite;
		
		g {
			transform: translateX(450px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}
	
	g:nth-of-type(3) {
		animation: up 6s 750ms infinite;
		
		g {
			transform: translateX(700px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}
	
	g:nth-of-type(4) {
		animation: up 5.5s 1.5s infinite;
		
		g {
			transform: translateX(500px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}
	
	g:nth-of-type(5) {
		animation: up 6.5s 4s infinite;
		
		g {
			transform: translateX(675px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}

}


.bubbles-small {
	overflow: visible;

	> g {
		transform: translateY(2048px);
		opacity: 0;
		will-change: transform, opacity;
	}

	g circle {
		transform: scale(0);
	}

	g:nth-of-type(1) {
		animation: up 5.25s infinite;
		
		g {
			transform: translateX(350px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}

	g:nth-of-type(2) {
		animation: up 5.75s infinite;
		
		g {
			transform: translateX(750px);
		}

		circle {
			animation: wobble 3s infinite ease-in-out;
		}

	}

	g:nth-of-type(3) {
		animation: up 5.25s 250ms infinite;
		
		g {
			transform: translateX(350px);
		}

		circle {
			animation: wobble 3s 250ms infinite ease-in-out;
		}

	}

	g:nth-of-type(4) {
		animation: up 5.75s 325ms infinite;
		
		g {
			transform: translateX(180px);
		}

		circle {
			animation: wobble 3s 325ms infinite ease-in-out;
		}

	}

	g:nth-of-type(5) {
		animation: up 6s 125ms infinite;
		
		g {
			transform: translateX(350px);
		}

		circle {
			animation: wobble 3s 250ms infinite ease-in-out;
		}

	}

	g:nth-of-type(6) {
		animation: up 5.13s 250ms infinite;
		
		g {
			transform: translateX(650px);
		}

		circle {
			animation: wobble 3s 125ms infinite ease-in-out;
		}

	}

	g:nth-of-type(7) {
		animation: up 6.25s 350ms infinite;
		
		g {
			transform: translateX(480px);
		}

		circle {
			animation: wobble 3s 325ms infinite ease-in-out;
		}

	}
	
	g:nth-of-type(8) {
		animation: up 7s 200ms infinite;
		
		g {
			transform: translateX(330px);
		}

		circle {
			animation: wobble 3s 325ms infinite ease-in-out;
		}

	}

	g:nth-of-type(9) {
		animation: up 6.25s 233ms infinite;
		
		g {
			transform: translateX(230px);
		}

		circle {
			animation: wobble 3s 275ms infinite ease-in-out;
		}

	}
	
	g:nth-of-type(10) {
		animation: up 6s 900ms infinite;
		
		g {
			transform: translateX(730px);
		}

		circle {
			animation: wobble 2s 905ms infinite ease-in-out;
		}

	}
	
}

@keyframes wobble {
	
	33% {
		transform: translateX(-50px);
	}
	
	66% {
		transform: translateX(50px);
	}
	
}

@keyframes up {

	0% {
		opacity: 0;
	}
	
	10%, 90% {
		opacity: 1;
	}
	
	100% {
		opacity: 0;
		transform: translateY(-1024px);
	}
	
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
  border: 1px solid black;
  margin-bottom: 7%;
  background-color: white;

}

.svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
 
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  height: 60vh;
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 60%;
  max-height: 90%;
  overflow: auto;
}

.modal-content input,
.modal-content textarea {
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.modal-navigation {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.prev-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.next-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.page-info {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.bubbles-large circle {
  fill: red; /* 버블의 큰 원의 색상 변경 */
}

.bubbles-small circle {
  fill: #ffcc00; /* 버블의 작은 원의 색상 변경 */
}
</style>