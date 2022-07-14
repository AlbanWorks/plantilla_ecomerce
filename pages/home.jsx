import Head from 'next/head'
import classes from 'generalStyles/pageStyles.module.css'
import LandingHeader from 'components/assets/Headers/LandingHeader/LandingHeader'
import Title from 'components/Client/Landing/Title/Title'
import About from 'components/Client/Landing/About/About'
import Section from 'components/Client/Landing/Section/Section'

export default function Hom() {

  return (
    <div className={classes.PageContainer}>
      <Head>
        <title>Alban Print</title>
      </Head>
      <LandingHeader/>
      <Title/>
      <About text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur suscipit nemo beatae saepe nihil, quasi corporis, perspiciatis maiores iusto fugiat incidunt quisquam. Repudiandae libero ipsa a asperiores quisquam aliquam dolor.'}/>
      <Section title={"Tarjetas"} image={"/uros.png"}/>
      <Section title={"Remeritas"} image={"/uros.png"}/>
      <Section title={"Impresión 3D"} image={"/uros.png"}/>
    </div>
  )
}
