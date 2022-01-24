import { reactive, toRefs } from 'vue';
//state 객체는 reactive하나 안에 count는 reactive하지 않음 
export const useCount = () => {
    const state = reactive({
        count: 0
    });

    return toRefs(state); //count의 값이 ref로 바뀜
}