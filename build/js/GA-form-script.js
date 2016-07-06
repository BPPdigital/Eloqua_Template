/**
 *  @author:    Danny Ng (http://www.dannytalk.com/2010/08/19/read-google-anÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦-cookie-script/)
 *  @modified:  19/08/10
 *  @notes:     Free to use and distribute without altering this comment. Would appreciate a link back :)
 */

// Strip leading and trailing white-space
String.prototype.trim = function() { return this.replace(/^\s*|\s*$/g, ''); }

// Check if string is empty
String.prototype.empty = function() {
  if (this.length == 0)
    return true;
  else if (this.length > 0)
    return /^\s*$/.test(this);
}

// Breaks cookie into an object of keypair cookie values
function crumbleCookie(c)
{
  var cookie_array = document.cookie.split(';');
  var keyvaluepair = {};
  for (var cookie = 0; cookie < cookie_array.length; cookie++)
  {
    var key = cookie_array[cookie].substring(0, cookie_array[cookie].indexOf('=')).trim();
    var value = cookie_array[cookie].substring(cookie_array[cookie].indexOf('=')+1, cookie_array[cookie].length).trim();
    keyvaluepair[key] = value;
  }

  if (c)
    return keyvaluepair[c] ? keyvaluepair[c] : null;

  return keyvaluepair;
}

/**
 *  For GA cookie explanation, see http://services.google.com/analytics/breeze/en/ga_cookies/index.html.
 *
 *  @return             -   <void>
 *
 *  @pre-condition      -   pageTracker initialised properly
 *  @post-condition     -   provides 'get' methods to access specific values in the Google Analytics cookies
 */
function gaCookies()
{
  // Cookie syntax: domain-hash.unique-id.ftime.ltime.stime.session-counter
  var utma = function() {
    var utma_array;
	
    if (crumbleCookie('__utma'))
      utma_array =  crumbleCookie('__utma').split('.');
    else
      return null;

    var domainhash = utma_array[0];
    var uniqueid = utma_array[1];
    var ftime = utma_array[2];
    var ltime = utma_array[3];
    var stime = utma_array[4];
    var sessions = utma_array[5];

    return {
      'cookie': utma_array,
      'domainhash': domainhash,
      'uniqueid': uniqueid,
      'ftime': ftime,
      'ltime': ltime,
      'stime': stime,
      'sessions': sessions
    };
  };

  // Cookie syntax: domain-hash.gif-requests.10.stime
  var utmb = function() {
    var utmb_array;

    if (crumbleCookie('__utmb'))
      utmb_array = crumbleCookie('__utmb').split('.');
    else
      return null;
    var gifrequest = utmb_array[1];

    return {
      'cookie': utmb_array,
      'gifrequest': gifrequest
    };
  };

  // Cookie syntax: domain-hash.value
  var utmv = function() {
    var utmv_array;

    if (crumbleCookie('__utmv'))
      utmv_array = crumbleCookie('__utmv').split('.');
    else
      return null;

    var value = utmv_array[1];

    return {
      'cookie': utmv_array,
      'value': value
    };
  };

  // Cookie syntax: domain-hash.ftime.?.?.utmcsr=X|utmccn=X|utmcmd=X|utmctr=X
  var utmz = function() {
    var cookie_data, no_of_parts, part_index, from_index, to_index, utmz_array, source, medium, name, term, content, gclid;

    if (crumbleCookie('__utmz')) {
      no_of_parts = 5;
      cookie_data = crumbleCookie('__utmz');
      from_index = 0;
      utmz_array = [];
      for (part_index = 0; part_index < no_of_parts; part_index++ ) {
        if (part_index == (no_of_parts - 1)) {
          utmz_array.push(cookie_data.substr(from_index))
        } else {
          to_index = cookie_data.substr(from_index).indexOf('.')
          utmz_array.push(cookie_data.substring(from_index, from_index + to_index))
          from_index = from_index + to_index + 1;
        }
      }
    } else {
      return null;
    }

    var utms = utmz_array[4].split('|');
    for (var i = 0; i < utms.length; i++) {
      var key = utms[i].substring(0, utms[i].indexOf('='));
      var val = decodeURIComponent(utms[i].substring(utms[i].indexOf('=')+1, utms[i].length));
      val = val.replace(/^\(|\)$/g, '');  // strip () brackets
      switch(key)
      {
        case 'utmcsr':
          source = val;
          break;
        case 'utmcmd':
          medium = val;
          break;
        case 'utmccn':
          name = val;
          break;
        case 'utmctr':
          term = val;
          break;
        case 'utmcct':
          content = val;
          break;
        case 'utmgclid':
          gclid = val;
          break;
      }
    }

    return {
      'cookie': utmz_array,
      'source': source,
      'medium': medium,
      'name': name,
      'term': term,
      'content': content,
      'gclid': gclid
    };
  };

  // Establish public methods

  // utma cookies
  this.getDomainHash = function() { return (utma() && utma().domainhash) ? utma().domainhash : null };
  this.getUniqueId = function() { return (utma() && utma().uniqueid) ? utma().uniqueid : null };

  this.getInitialVisitTime = function() { return (utma() && utma().ftime) ? utma().ftime : null };
  this.getPreviousVisitTime = function() { return (utma() && utma().ltime) ? utma().ltime : null };
  this.getCurrentVisitTime = function() { return (utma() && utma().stime) ? utma().stime : null };
  this.getSessionCounter = function() { return (utma() && utma().sessions) ? utma().sessions : null };

  // utmb cookies
  this.getGifRequests = function() { return (utmb() && utmb().gifrequest) ? utmb().gifrequest : null };

  // utmv cookies
  this.getUserDefinedValue = function () { return (utmv() && utmv().value) ? decodeURIComponent(utmv().value) : null };

  // utmz cookies
  this.getCampaignSource = function () { return (utmz() && utmz().source) ? utmz().source : null };
  this.getCampaignMedium = function () { return (utmz() && utmz().medium) ? utmz().medium : null };
  this.getCampaignName = function () { return (utmz() && utmz().name) ? utmz().name : null };
  this.getCampaignTerm = function () { return (utmz() && utmz().term) ? utmz().term : null};
  this.getCampaignContent = function () { return (utmz() && utmz().content) ? utmz().content : null };
  this.getGclid = function () { return (utmz() && utmz().gclid) ? utmz().gclid : null };
}
;

$(document).ready(function(){
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1353496-1']);
_gaq.push(['_setDomainName', 'bppuniversity.ac.uk']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);
var z = _uGC(document.cookie, '__utmz=', ';');
var source = _uGC(z, 'utmcsr=', '|');
var medium = _uGC(z, 'utmcmd=', '|');
var term = _uGC(z, 'utmctr=', '|');
var content = _uGC(z, 'utmcct=', '|');
var campaign = _uGC(z, 'utmccn=', '|');
var gclid = _uGC(z, 'utmgclid=', '|');
if (gclid !="-") {
 source = 'google';
 medium = 'cpc';
}

var csegment = _uGC(document.cookie, '__utmv=', ';');
if (csegment != '-') {
 var csegmentex = /[1-9]*?\.(.*)/;
 csegment = csegment.match(csegmentex);
 csegment = csegment[1];

} else {
 csegment = '';
}

function _uGC(l,n,s)
{
if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
var i,i2,i3,c="-";
i=l.indexOf(n);
i3=n.indexOf("=")+1;
if (i > -1) {
i2=l.indexOf(s,i); if (i2 < 0){ i2=l.length; }
c=l.substring((i+i3),i2);
}
return c;
}

document.getElementById("campaignMedium").value =medium; /* Campaign_Medium */
document.getElementById("campaignSource").value =source; /* Campaign_Source */
document.getElementById("campaignName").value =campaign; /* Campaign_CampaignName */

      
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

});