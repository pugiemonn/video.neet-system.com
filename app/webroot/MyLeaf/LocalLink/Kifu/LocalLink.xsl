<?xml version="1.0" encoding="shift_jis" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="shift_jis" /> 

<xsl:template match="/">

<!-- 以下HTML形式で編集できます -->

<html>
<head>
   <title> 石葉２ - LeafShow </title>
</head>
   
<body bgcolor="#ddfdbd">
<center>

<script type = "text/JavaScript">
<xsl:comment> 
<![CDATA[

function getAdv()
{
if(location.search)
{ 
tmp = location.search.indexOf("@"); 
if(tmp > -1) { return location.search.substring(tmp); }
}
return ""; 
}

document.write('<applet codebase="../../../MyLeaf" code=KifuShow.LeafShow.class name=LeafShow width=555 height=640 archive=LeafShow2.jar >');
document.write('<param name="advancemoves" value="' + getAdv() + '" />');

]]>

</xsl:comment>
</script>
<param name="leafhint" value="tanabata" />
<param name="sa5lala" value="true,flow" />
<param name="xslpath" value="LocalLink.xsl" />
<param name="moves" >
   <xsl:attribute name="value">
       <xsl:apply-templates select="igo/kifu" /> 
   </xsl:attribute>
</param> 
<script type = "text/JavaScript">
<xsl:comment>
<![CDATA[ document.write("</applet>"); ]]>
</xsl:comment>
</script> 


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