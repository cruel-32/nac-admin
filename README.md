# nac-admin
nac-admin

- firebase
- vue (with typescript)
- pwa

https://nac-admin.firebaseapp.com

### 이 프로젝트는 코드가 개판이다.

무엇보다 firebase의 odm을 다루는데 있어서 삽질을 많이했고 그것에 대한 미숙함으로 인해 DB설계단계에서 이미 실패했기에 개판이 될 수 밖에 없었다. monggoDB를 경험하고 나서 깨달았다. 데이터 구조부터 잘못되었기 때문에 firebase의 명령어들이 말을 안들었던 것임을... 그 탓에 데이터를 받아오고 변형하는 과정에서 백엔드에서 처리할 내용을 프론트에서 하다보니 쓸데없는 비용이 너무 많이 필요한 코드가 되어버렸다. 보안도 엉망. firebase가 좀더 친절하게 에러코드를 뱉었다면 이지경까지 안되지 않았을까 싶지만... 어쩔수 없지. 어차피 최대정원이 50명밖에 안되는 모임이니 과부하가 걸릴 일도  다시 뒤집어 엎기엔 늦었으니 다음 프로젝트부턴 잘 만들자. 다음은 정말 잘 만들수 있을것 같다.

### 타입스크립트를 다루는 것 역시 미숙했다.
물론 db설계가 개판이라 model, service, controller 모두 코드가 꼬여버린게 가장 원인이 크지만... 정적 프로그래밍에 익숙하지 않은 탓도 있다.  역시 다음에는 더 잘 할 수 있을거 같다!

 
