<template>
  <div class="cart-list">
    <b-scroll class="content" ref="BScroll">
      <template #wrapper>
        <li>内容1</li>
        <li>内容2</li>
        <li>内容3</li>
        <li>内容4</li>
        <li>内容5</li>
        <li>内容6</li>
        <li>内容7</li>
        <li>内容8</li>
        <li>内容9</li>
        <li>内容10</li>
        <li>内容11</li>
        <li>内容12</li>
        <li>内容13</li>
        <li>内容14</li>
        <li>内容15</li>
        <li>内容16</li>
        <li>内容17</li>
        <li>内容18</li>
        <li>内容19</li>
        <li>内容20</li>
        <li>内容21</li>
        <li>内容22</li>
        <li>内容23</li>
        <li>内容24</li>
        <li>内容25</li>
        <li>内容26</li>
        <li>内容27</li>
        <li>内容28</li>
        <li>内容29</li>
        <li>内容30</li>
        <li>内容31</li>
        <li>内容32</li>
        <li>内容33</li>
        <li>内容34</li>
        <li>内容35</li>
        <li>内容36</li>
        <li>内容37</li>
        <li>内容38</li>
        <li>内容39</li>
        <li>内容40</li>
        <li>内容41</li>
        <li>内容42</li>
        <li>内容43</li>
        <li>内容44</li>
        <li>内容45</li>
        <li>内容46</li>
        <li>内容47</li>
        <li>内容48</li>
        <li>内容49</li>
        <li>内容50</li>
        <cart-list-item v-for="(item,index) in cartList" :key="index" :list-item='item'/>
      </template>
    </b-scroll>
  </div>
</template>
<script>
import BScroll from "components/common/bscroll/BScroll"
import { mapGetters } from "vuex";
import CartListItem from './CartListItem';
export default {
  name: "CartList",
  components: {
    BScroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.BScroll.refresh()
  },
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
  /* height: 100vh; */
}
.content {
  height: 100%;
  /* height: calc(100% - 44px - 49px); */
  overflow: hidden;
}
</style>