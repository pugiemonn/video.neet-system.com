<?xml version="1.0" encoding="shift_jis" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="shift_jis" /> 

<xsl:template match="/">

<!-- 以下HTML形式で編集できます -->

<html>
<head>
   <title> 石葉２ - LeafShow </title>
</head>
   
<body bgcolor="Lightsteelblue">
<base target="new" /> <center><br /><br />  
      
<applet
codebase ="MyLeaf"
code     ="KifuShow.LeafShow.class"
name     ="LeafShow"
width    = "555"
height   = "555"
archive  = "LeafShow2.jar"
>

<!-- 各パラメータ値を以下に書く。-->
     
<param name="advancemoves" value="false" />
<param name="number" value="true" />

<param name="moves" >
   <xsl:attribute name="value">
       <xsl:apply-templates select="igo/kifu" /> 
   </xsl:attribute>
</param> 

</applet>
</center>
</body>
</html>

<!-- HTML_END -->

</xsl:template>

<xsl:template match="*">
   
<xsl:text>&lt;</xsl:text> 
<xsl:value-of select="name()" />
   
<xsl:for-each select="@*">
   <xsl:text> </xsl:text>
   <xsl:value-of select="name()" />      
   <xsl:text>=&quot;</xsl:text> 
   <xsl:value-of select="." />
   <xsl:text>&quot;</xsl:text>  
</xsl:for-each>

<xsl:if test="count(child::*) = 0">
   <xsl:text> /&gt;</xsl:text>    
</xsl:if>

<xsl:if test="count(child::*) > 0">
   <xsl:text>&gt;</xsl:text>     
      <xsl:apply-templates />
   <xsl:text>&lt;/</xsl:text>
   <xsl:value-of select="name()" />
   <xsl:text>&gt;</xsl:text>     
</xsl:if>        

</xsl:template>

</xsl:stylesheet>