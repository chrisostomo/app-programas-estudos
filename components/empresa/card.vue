<template>
  <v-card
    width="344"

    outlined
    :to="to ? { name:'empresa-id', params: { id: item.id } } : null"
    >
    <v-card-text>
      <div class="d-flex justify-space-between">
        <div>
          <div class="font-weight-bold headline">
            {{ item.nome.value }}
          </div>
          <div class="font-weight-bold overline">
            {{ item.categoria_primaria.value }}
          </div>
        </div>
        <div>
          <v-img
            :src="`https://avatars.dicebear.com/4.5/api/initials/${item.nome.value}.svg`"
            width="100"
            >
          </v-img>
        </div>
      </div>
      <div>
        <div class="font-weight-medium">{{ endereco }}</div>
        <div class="font-weight-medium">{{ site }}</div>
        <div class="font-weight-medium">{{ telefone }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default {
    name: 'empresa-card',
    props: {
      item: {
        require: true,
        type: Object
      },
      to: {
        require: false,
        default: true,
        type: Boolean
      }
    },
    computed: {
      endereco(){ return this.item.exibicao.value.endereco ? this.item.endereco_rua.value : null },
      telefone(){ return this.item.exibicao.value.telefone ? this.item.telefone.value : null },
      email(){ return this.item.exibicao.value.email ? this.item.email.value : null },
      site(){ return this.item.site.value },
    }
  }
</script>